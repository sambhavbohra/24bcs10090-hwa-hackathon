import {
  CURRENCY,
  formatINR,
  getProductById,
  getProductBySlug,
  products,
  publicProduct,
  resolveSelection,
  resolveUnitPrice,
  validateSelection,
  variantLabel,
} from '@/lib/products';

export const dynamic = 'force-dynamic';

const MAX_LINE_ITEMS = 20;
const MAX_QUANTITY = 20;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...corsHeaders,
    },
  });
}

function fail(status, code, message) {
  return json({ ok: false, error: { code, message } }, status);
}

function clean(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function sanitiseCustomer(raw) {
  const customer = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  return {
    name: clean(customer.name, 120),
    email: clean(customer.email, 160),
    phone: clean(customer.phone, 40),
    address: clean(customer.address, 300),
    city: clean(customer.city, 100),
    state: clean(customer.state, 100),
    pincode: clean(customer.pincode ?? customer.pin, 20),
    notes: clean(customer.notes, 500),
  };
}

function normaliseItem(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  return {
    productId: raw.productId ?? raw.id ?? raw.slug,
    quantity: raw.quantity ?? raw.qty ?? 1,
    variant: raw.variant ?? raw.selection ?? raw.options ?? {},
  };
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  return json({
    ok: true,
    endpoint: 'POST /api/orders',
    currency: CURRENCY,
    accepts: {
      items: [
        {
          productId: 'stay-station',
          quantity: 1,
          variant: { size: 'large', colour: 'oat' },
        },
      ],
      customer: {
        name: 'Ada',
        email: 'ada@example.com',
        phone: '+91 90000 00000',
        address: '12 Example Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        notes: 'Leave with the guard',
      },
    },
    note: 'Prices are always recalculated on the server from lib/products.js. Variants are optional; the first option is used when a variant is omitted.',
    products: products.map(publicProduct),
  });
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return fail(
        400,
        'MALFORMED_BODY',
        'Send a JSON body like { "items": [{ "productId": "stay-station", "quantity": 1 }] }.'
      );
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return fail(400, 'MALFORMED_BODY', 'The request body must be a JSON object.');
    }

    let rawItems = body.items;
    if (rawItems === undefined && (body.productId || body.id || body.slug)) {
      rawItems = [body];
    }

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return fail(400, 'EMPTY_CART', 'Add at least one item to the order.');
    }

    if (rawItems.length > MAX_LINE_ITEMS) {
      return fail(
        400,
        'TOO_MANY_ITEMS',
        `An order can contain at most ${MAX_LINE_ITEMS} line items.`
      );
    }

    const items = [];

    for (let index = 0; index < rawItems.length; index += 1) {
      const normalised = normaliseItem(rawItems[index]);
      if (!normalised) {
        return fail(
          400,
          'MALFORMED_ITEM',
          `Item ${index + 1} must be an object with a productId and quantity.`
        );
      }

      const { productId, quantity: rawQuantity, variant } = normalised;

      if (typeof productId !== 'string' || !productId.trim()) {
        return fail(
          400,
          'UNKNOWN_PRODUCT',
          `Item ${index + 1} is missing a productId.`
        );
      }

      const key = productId.trim().toLowerCase();
      const product = getProductById(key) || getProductBySlug(key);

      if (!product) {
        return fail(
          400,
          'UNKNOWN_PRODUCT',
          `Unknown product "${productId.trim()}". Call GET /api/orders to see the valid product ids.`
        );
      }

      const quantity = Number(rawQuantity);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
        return fail(
          400,
          'INVALID_QUANTITY',
          `Item ${index + 1} needs a whole-number quantity between 1 and ${MAX_QUANTITY}.`
        );
      }

      const selectionCheck = validateSelection(product, variant);
      if (!selectionCheck.ok) {
        return fail(400, 'INVALID_VARIANT', selectionCheck.message);
      }

      const selection = resolveSelection(product, variant);
      const unitPrice = resolveUnitPrice(product, selection);

      items.push({
        productId: product.id,
        name: product.name,
        variant: selection,
        variantLabel: variantLabel(product, selection),
        quantity,
        unitPrice,
        lineTotal: unitPrice * quantity,
      });
    }

    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const shipping = 0;
    const total = subtotal + shipping;
    const createdAt = new Date().toISOString();
    const orderId = `STAY-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;

    return json(
      {
        ok: true,
        orderId,
        currency: CURRENCY,
        items,
        subtotal,
        shipping,
        tax: 0,
        total,
        totalFormatted: formatINR(total),
        customer: sanitiseCustomer(body.customer),
        createdAt,
        message: 'Order received. No payment was collected.',
      },
      201
    );
  } catch {
    return fail(
      400,
      'BAD_REQUEST',
      'We could not process that order. Check the request and try again.'
    );
  }
}

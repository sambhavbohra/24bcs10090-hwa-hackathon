'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getProductById,
  resolveSelection,
  resolveUnitPrice,
  variantLabel,
} from '@/lib/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'stay-cart-v1';

function lineKey(productId, selection) {
  const ordered = Object.keys(selection || {})
    .sort()
    .map((key) => `${key}:${selection[key]}`)
    .join('|');
  return `${productId}::${ordered}`;
}

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const clean = parsed
            .map((item) => {
              const product = item && getProductById(item.productId);
              if (!product) return null;
              const quantity = Number(item.quantity);
              if (!Number.isInteger(quantity) || quantity < 1) return null;
              return {
                productId: product.id,
                selection: resolveSelection(product, item.selection || {}),
                quantity: Math.min(quantity, 20),
              };
            })
            .filter(Boolean);
          setItems(clean);
        }
      }
    } catch {
      setItems([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      return;
    }
  }, [items, hydrated]);

  const detailed = useMemo(() => {
    return items
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        const unitPrice = resolveUnitPrice(product, item.selection);
        return {
          ...item,
          key: lineKey(item.productId, item.selection),
          product,
          unitPrice,
          lineTotal: unitPrice * item.quantity,
          label: variantLabel(product, item.selection),
        };
      })
      .filter(Boolean);
  }, [items]);

  const count = useMemo(
    () => detailed.reduce((sum, item) => sum + item.quantity, 0),
    [detailed]
  );

  const subtotal = useMemo(
    () => detailed.reduce((sum, item) => sum + item.lineTotal, 0),
    [detailed]
  );

  function addItem(productId, selection, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;
    const resolved = resolveSelection(product, selection || {});
    const qty = Math.max(1, Math.min(20, Math.floor(Number(quantity)) || 1));
    const key = lineKey(productId, resolved);
    setItems((current) => {
      const existing = current.find(
        (item) => lineKey(item.productId, item.selection) === key
      );
      if (existing) {
        return current.map((item) =>
          lineKey(item.productId, item.selection) === key
            ? { ...item, quantity: Math.min(20, item.quantity + qty) }
            : item
        );
      }
      return [...current, { productId, selection: resolved, quantity: qty }];
    });
  }

  function setQuantity(productId, selection, quantity) {
    const key = lineKey(productId, selection);
    const qty = Math.max(1, Math.min(20, Math.floor(Number(quantity)) || 1));
    setItems((current) =>
      current.map((item) =>
        lineKey(item.productId, item.selection) === key
          ? { ...item, quantity: qty }
          : item
      )
    );
  }

  function removeItem(productId, selection) {
    const key = lineKey(productId, selection);
    setItems((current) =>
      current.filter(
        (item) => lineKey(item.productId, item.selection) !== key
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const value = {
    items: detailed,
    count,
    subtotal,
    hydrated,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useOptionalCart() {
  return useContext(CartContext);
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspaceStore';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ShieldCheck, Truck, Sparkles, Copy, Check } from 'lucide-react';

export function RentModal() {
  const { isRentModalOpen, setIsRentModalOpen, getSelectedSummary, getTotalMonthlyRent } =
    useWorkspaceStore();

  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isRentModalOpen) return null;

  const items = getSelectedSummary();
  const total = getTotalMonthlyRent();

  const handleConfirm = () => {
    // Launch confetti celebration!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    setIsSuccess(true);
  };

  const handleCopySpec = () => {
    const text = `Monis 3D Virtual Workspace Configuration:\n` +
      items.map(i => `• [${i.slot}] ${i.name} - $${i.price}/mo`).join('\n') +
      `\n\nTotal Monthly Rent: $${total}/mo`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-6 text-zinc-900 dark:text-zinc-100 max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={() => {
            setIsRentModalOpen(false);
            setIsSuccess(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            {/* Modal Header */}
            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Setup Rental Summary
              </span>
              <h3 className="text-xl font-extrabold tracking-tight mt-0.5">
                Your Workspace Setup Breakdown
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Flexible monthly subscription. Free white-glove delivery, assembly, and device upgrades.
              </p>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 mb-4 max-h-60 border-y border-zinc-100 dark:border-zinc-800/80 py-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-200/60 dark:bg-zinc-700 px-1.5 py-0.5 rounded">
                      {item.slot}
                    </span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{item.name}</span>
                  </div>
                  <span className="font-extrabold text-zinc-900 dark:text-zinc-100">
                    ${item.price}
                    <span className="text-[10px] font-normal text-zinc-400">/mo</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Perks */}
            <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2 bg-emerald-50/60 dark:bg-emerald-950/20 p-2 rounded-xl text-emerald-800 dark:text-emerald-300">
                <Truck className="w-4 h-4 shrink-0" />
                <span>Free delivery & setup</span>
              </div>
              <div className="flex items-center gap-2 bg-indigo-50/60 dark:bg-indigo-950/20 p-2 rounded-xl text-indigo-800 dark:text-indigo-300">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>14-day ergonomic guarantee</span>
              </div>
            </div>

            {/* Total and CTA */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs text-zinc-500 font-medium">Estimated Monthly Rent:</span>
                  <p className="text-[10px] text-zinc-400">Cancel or swap components anytime</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                    ${total}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500"> / month</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopySpec}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold transition-all cursor-pointer"
                  title="Copy Setup Specs"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Specs'}</span>
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-extrabold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Rent This Setup</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Success Screen */
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-1">
              Setup Order Confirmed! 🎉
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mb-6 leading-relaxed">
              Your 3D virtual workspace configuration has been saved. Our concierge team will reach out shortly to coordinate delivery & installation!
            </p>

            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 w-full mb-6 text-left text-xs">
              <div className="flex justify-between font-bold mb-1">
                <span>Total Items:</span>
                <span>{items.length} Units</span>
              </div>
              <div className="flex justify-between font-black text-sm text-indigo-600 dark:text-indigo-400">
                <span>Monthly Subscription:</span>
                <span>${total} / month</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsRentModalOpen(false);
                setIsSuccess(false);
              }}
              className="w-full py-3 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-extrabold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              Back to 3D Configurator
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  findCountryByCode,
  getCountryOptions,
  type CountryOption,
} from "@/app/data/countries";

type CheckoutCountrySelectProps = {
  value: string;
  onChange: (countryCode: string) => void;
};

export function CheckoutCountrySelect({
  value,
  onChange,
}: CheckoutCountrySelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const countries = useMemo(() => getCountryOptions(), []);
  const selected = findCountryByCode(value, countries);

  const filteredCountries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return countries;

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(normalized) ||
        country.code.toLowerCase().includes(normalized)
    );
  }, [countries, query]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      searchRef.current?.focus();
    }
  }, [open]);

  function selectCountry(country: CountryOption) {
    onChange(country.code);
    setOpen(false);
    setQuery("");
  }

  function toggleOpen() {
    setOpen((current) => !current);
    if (open) {
      setQuery("");
    }
  }

  return (
    <div
      ref={rootRef}
      className={`checkout-country-select${open ? " checkout-country-select--open" : ""}`}
    >
      <label className="checkout-contact__field" htmlFor={`${listId}-trigger`}>
        <span>Country *</span>
        <button
          id={`${listId}-trigger`}
          type="button"
          className="checkout-country-select__trigger input"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={toggleOpen}
        >
          <span
            className={
              selected
                ? "checkout-country-select__value"
                : "checkout-country-select__placeholder"
            }
          >
            {selected ? selected.name : "Search and select your country"}
          </span>
          <CaretDown
            size={16}
            weight="bold"
            className="checkout-country-select__caret"
            aria-hidden
          />
        </button>
      </label>

      {open ? (
        <div className="checkout-country-select__panel">
          <div className="checkout-country-select__search-wrap">
            <MagnifyingGlass
              size={16}
              weight="bold"
              className="checkout-country-select__search-icon"
              aria-hidden
            />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="checkout-country-select__search input"
              placeholder="Search country..."
              aria-controls={listId}
              autoComplete="off"
            />
          </div>

          <ul id={listId} className="checkout-country-select__list" role="listbox">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = country.code === value;
                return (
                  <li key={country.code} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`checkout-country-select__option${
                        isSelected ? " checkout-country-select__option--selected" : ""
                      }`}
                      onClick={() => selectCountry(country)}
                    >
                      <span>{country.name}</span>
                      <span className="checkout-country-select__code">{country.code}</span>
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="checkout-country-select__empty" role="none">
                No countries found
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

<style>
  /* TODO: hover/focus styles */
  button {
    background: var(--colorCta);
    border: none;
    border-radius: calc(
      (2 * (var(--spacingSmall) * 1.5) + var(--typeLineHeightTight)) / 2
    );
    color: var(--colorFgInverse);
    cursor: pointer;
    font-size: var(--typeSizeSmall);
    font-weight: var(--typeWeightBold);
    line-height: var(--typeLineHeightTight);
    padding: calc(var(--spacingSmall) * 1.5) var(--spacingLarge);
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: uppercase;
    transition: filter 150ms;
  }
  button:focus,
  button:hover {
    filter: brightness(115%);
  }
</style>

<button on:click>
  <slot />
</button>

<style>
  button {
    background: var(--colorCta);
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
    text-overflow: ellipse;
    text-transform: uppercase;
  }
</style>

<button on:click>
  <slot />
</button>

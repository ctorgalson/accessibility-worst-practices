---
title: "Rely on Drupal core's a11y work"
image: "/images/Drupal Logo_Horizontal_White.svg"
slideType: "simple"
detailSlide: true
---
<section>

### Out of the box, Drupal avoids
- [skip links](https://webaim.org/projects/million/#skip) (affects > 83% of sites)
- [improper form labels](https://webaim.org/projects/million/#labels) (affects 33.1% of sites)
- [missing document language](https://webaim.org/projects/million/#languages) (affects 13.5% of sites)
- empty buttons

</section>
<section>

### But
- these are overrideable, so they can't be excluded from checks
- modules and themes often do worse than core (especially with things like form labels)
- some Drupal accessibility "helpers" are often flagged as problems by accessibility auditors
- the module and core ecosystem are the wild west

</section>
<style>
#s20-ignore-element-active-states {
  img {
    object-position: top center;
  }
}
</style>

<style>
#s28-override-drupal-a11y-safeguards {
  .slide__image {
    background: var(--pico-color-slate-650);

    img {
      margin-inline: auto;
      max-width: 75vw;
      object-fit: contain;
    }
}
</style>

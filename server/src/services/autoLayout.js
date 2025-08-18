// Simple automated layout engine
export function computeMaxImages(pagesTotal) {
  const rules = {
    18: 50, // 16 + 2 cover
    22: 62, // 20 + 2 cover
    32: 92, // 30 + 2 cover
    42: 122 // 40 + 2 cover
  };
  return rules[pagesTotal] || pagesTotal * 3; // fallback heuristic
}

export function generateAutoPages(images, pagesTotal) {
  const covers = 2;
  const innerPages = pagesTotal - covers;
  const layouts = ['one','two','three','four'];
  const pages = [];
  let idx = 0;

  for (let i = 0; i < innerPages; i++) {
    const layout = layouts[i % layouts.length];
    const perPage = layout === 'one' ? 1 : layout === 'two' ? 2 : layout === 'three' ? 3 : 4;
    const imgs = [];
    for (let j = 0; j < perPage && idx < images.length; j++) {
      imgs.push({ url: images[idx], caption: '' });
      idx++;
    }
    pages.push({ index: i, images: imgs, layout });
  }
  return pages;
}

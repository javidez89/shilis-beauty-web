"""Generate canonical URLs, sitemap and robots for GitHub Pages deployment."""
from pathlib import Path
from html import escape
from urllib.parse import quote
import os,re
ROOT=Path(__file__).resolve().parents[1]
repo=os.environ.get('REPOSITORY','javidez89/shilis-beauty-web')
owner,name=repo.split('/',1)
base=f'https://{owner}.github.io/{name}/'
files=['index.html','servicios.html','galeria.html','nosotros.html','contacto.html']
for f in files:
    p=ROOT/f
    page=p.read_text(encoding='utf-8')
    target=base if f=='index.html' else base+f
    page=re.sub(r'<link rel="canonical" href="[^"]+">',f'<link rel="canonical" href="{target}">',page)
    page=re.sub(r'<meta property="og:url" content="[^"]+">',f'<meta property="og:url" content="{target}">',page)
    page=re.sub(r'<meta property="og:image" content="[^"]+">',f'<meta property="og:image" content="{base}assets/img/portada-v2.webp">',page)
    p.write_text(page,encoding='utf-8')
locs='\n'.join(f'  <url><loc>{escape(base if f=="index.html" else base+f)}</loc></url>' for f in files)
(ROOT/'sitemap.xml').write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{locs}\n</urlset>\n',encoding='utf-8')
(ROOT/'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {base}sitemap.xml\n',encoding='utf-8')
print(f'Generated SEO files for {base}')

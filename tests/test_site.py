"""Dependency-free smoke tests for the Shili's static site."""
from pathlib import Path
from html.parser import HTMLParser
import re
ROOT=Path(__file__).resolve().parents[1]
PAGES=['index.html','servicios.html','galeria.html','nosotros.html','contacto.html']
class Inspector(HTMLParser):
    def __init__(self):
        super().__init__(); self.tags=[]; self.refs=[]; self.links=[]; self.ids=set(); self.alt_missing=[]; self.titles=0; self.description=False; self.h1=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs);self.tags.append(tag)
        if tag=='h1':self.h1+=1
        if tag=='title':self.titles+=1
        if tag=='meta' and a.get('name')=='description':self.description=bool(a.get('content'))
        if tag=='img' and not a.get('alt'):self.alt_missing.append(a.get('src'))
        if a.get('id'):self.ids.add(a['id'])
        for field in ('src','href'):
            val=a.get(field,'')
            if val and not val.startswith(('http:','https:','#','mailto:','tel:','data:','javascript:')):
                self.refs.append(val.split('#')[0].split('?')[0])
                if field=='href' and val.endswith('.html'):self.links.append(val)
for name in PAGES:
    page=ROOT/name
    assert page.exists(),f'Missing page {name}'
    txt=page.read_text(encoding='utf8')
    p=Inspector();p.feed(txt)
    assert p.h1==1,f'{name} must have exactly one h1 (got {p.h1})'
    assert p.titles==1 and p.description,f'{name} lacks SEO basics'
    assert not p.alt_missing,f'{name} images missing alt: {p.alt_missing}'
    for ref in p.refs:
        assert (ROOT/ref).exists(),f'{name}: missing resource {ref}'
    for other in PAGES:
        if other!=name:assert other in txt,f'{name} missing nav link {other}'
    assert '318 786 2277' in txt or '573187862277' in txt, name+' missing WhatsApp'
    assert 'https://maps.app.goo.gl/U5dkvPXNxGehfEHY7' in txt, name+' missing map link'
    assert 'width=device-width' in txt,name+' missing viewport'
    print('PASS',name,'links/assets:',len(p.refs))
assert (ROOT/'docs/manual-marca.pdf').exists()
assert (ROOT/'.github/workflows/deploy.yml').exists()
print('All static-site smoke tests passed.')

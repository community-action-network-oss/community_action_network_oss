#!/usr/bin/env python3
"""Design pack checks. Run: python3 docs/design/check.py  (exit 1 on any failure)
- every message id used in wireframes exists in copy-deck*.md
- no em or en dashes in docs/design or docs/adr
- every file is 25KB or less
- every WF id referenced in journeys.md/screens.md is defined in wireframes/
- tokens.json has every contrastVerified pair at or above its minimum
"""
import re, glob, json, os, sys
d = os.path.dirname(os.path.abspath(__file__)); adr = os.path.join(d, '..', 'adr')
ux = os.path.join(d, 'ux'); bad = []
rd = lambda p: open(p, encoding='utf-8').read()
deck = set(re.findall(r'^\| ([a-z]+\.[A-Za-z.]+) \|', ''.join(rd(f) for f in glob.glob(ux + '/copy-deck*.md')), re.M))
defined, used_wf = set(), set()
for f in glob.glob(ux + '/wireframes/*.md'):
    t = rd(f)
    defined |= set(re.findall(r'^## (WF-[A-Z0-9-]+)', t, re.M))
    for i in set(re.findall(r'\{([a-z]+\.[A-Za-z.]+)\}', t)) | set(re.findall(r'`([a-z]+\.[A-Za-z.]+)`', t)):
        if i not in deck and i != 'message.id': bad.append('missing message id ' + i)
for f in ('journeys.md', 'screens.md'):
    used_wf |= set(re.findall(r'WF-[A-Z0-9]+(?:-[A-Z0-9]+)*-\d+', rd(ux + '/' + f)))
for w in sorted(used_wf - defined): bad.append('undefined wireframe ' + w)
for f in glob.glob(d + '/**/*', recursive=True) + glob.glob(adr + '/*'):
    if os.path.isfile(f) and not f.endswith('.pyc'):
        t = rd(f)
        if chr(0x2014) in t or chr(0x2013) in t: bad.append('dash in ' + f)
        if len(t.encode()) > 25600: bad.append('over 25KB ' + f)
for p in json.load(open(ux + '/tokens.json'))['contrastVerified']:
    if p['ratio'] < p['min']: bad.append('contrast ' + p['pair'])
print('\n'.join(bad) or 'design pack OK: %d message ids, %d wireframes' % (len(deck), len(defined)))
sys.exit(1 if bad else 0)

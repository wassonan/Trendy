from pattern.web import *
import sys

f = open("test.txt", "w");
f.write("test");

input_url = str(sys.argv[1])
topic = str(sys.argv[2])
counter = int(sys.argv[3])
article_list = dict()
if len(sys.argv) == 5:
    a_list = sys.argv[4].split('^')
    print a_list
    a_list = [a.split('@') for a in a_list]
    print a_list
    for a in a_list:
        article_list[a[0]] = a[1]
    print article_list

class GTScrape(Crawler):
    def follow(self, link):
        u = URL(link.url).domain
        return u == URL(link.referrer).domain and (all(t.lower() in link.url for t in topic.split()))

    def visit(self, link, source=None):
        #print 'visited:', repr(link.url), 'from:', link.referrer
        try:
            tit = str(DOM(URL(link.url).download())('title')[0])
            searcher = re.compile('>(.+)<')#regex
            tit = repr(searcher.findall(tit))[2:-2]#using regex on str
            if topic.lower() in tit.lower() and not tit in article_list:
                global counter
                counter -= 1
                article_list[tit] = link.url
                
        except:
            print 'failed:', sys.exc_info()
	
    def fail(self, link):
        print 'failed:', repr(link.url)
            

p = GTScrape(links=[input_url], delay=1, sort = FIFO)

while counter > 0 and not p.done:
    p.crawl(method='DEPTH', cached=False, throttle=1)

for (key, value) in article_list.iteritems():
    sys.stdout.write(key+"@"+value+"^")

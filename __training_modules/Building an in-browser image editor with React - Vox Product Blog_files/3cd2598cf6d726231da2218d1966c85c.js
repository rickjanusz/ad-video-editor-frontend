document.write('<link rel="stylesheet" href="https://github.githubassets.com/assets/gist-embed-4e64bbf96c31ed6c9ee61f08cea01836.css">')
document.write('<div id=\"gist105966881\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-zoomslider-js\" class=\"file my-2\">\n    \n\n  <div itemprop=\"text\" class=\"Box-body p-0 blob-wrapper data type-javascript  \">\n      \n<table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\" data-paste-markdown-skip>\n      <tr>\n        <td id=\"file-zoomslider-js-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-zoomslider-js-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>import<\/span> <span class=pl-v>Slider<\/span> <span class=pl-k>from<\/span> <span class=pl-s>&#39;rc-slider&#39;<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-zoomslider-js-LC2\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-zoomslider-js-LC3\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-c1>ZOOM_MIN<\/span> <span class=pl-c1>=<\/span> <span class=pl-c1>1<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-zoomslider-js-LC4\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-c1>ZOOM_MAX<\/span> <span class=pl-c1>=<\/span> <span class=pl-c1>3<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-zoomslider-js-LC5\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-c1>ZOOM_STEP<\/span> <span class=pl-c1>=<\/span> <span class=pl-c1>0.01<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-zoomslider-js-LC6\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-zoomslider-js-LC7\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>export<\/span> <span class=pl-k>default<\/span> <span class=pl-k>function<\/span> <span class=pl-v>ZoomSlider<\/span><span class=pl-kos>(<\/span><span class=pl-kos>{<\/span> <span class=pl-s1>onChange<\/span><span class=pl-kos>,<\/span> <span class=pl-s1>zoom<\/span> <span class=pl-kos>}<\/span><span class=pl-kos>)<\/span> <span class=pl-kos>{<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-zoomslider-js-LC8\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-k>return<\/span> <span class=pl-kos>(<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-zoomslider-js-LC9\" class=\"blob-code blob-code-inner js-file-line\">    <span class=pl-c1>&lt;<\/span><span class=pl-ent>div<\/span> <span class=pl-c1>className<\/span><span class=pl-c1>=<\/span><span class=pl-s>&quot;mb-12&quot;<\/span><span class=pl-c1>&gt;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-zoomslider-js-LC10\" class=\"blob-code blob-code-inner js-file-line\">      <span class=pl-c1>&lt;<\/span><span class=pl-ent>h1<\/span> <span class=pl-c1>className<\/span><span class=pl-c1>=<\/span><span class=pl-s>&quot;text-sm text-black font-medium&quot;<\/span><span class=pl-c1>&gt;<\/span>Image zoom<span class=pl-c1>&lt;<\/span>/<span class=pl-ent>h1<\/span><span class=pl-c1>&gt;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L11\" class=\"blob-num js-line-number\" data-line-number=\"11\"><\/td>\n        <td id=\"file-zoomslider-js-LC11\" class=\"blob-code blob-code-inner js-file-line\">      <span class=pl-c1>&lt;<\/span><span class=pl-ent>div<\/span> <span class=pl-c1>className<\/span><span class=pl-c1>=<\/span><span class=pl-s>&quot;w-auto px-2 py-2 mx-auto&quot;<\/span><span class=pl-c1>&gt;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L12\" class=\"blob-num js-line-number\" data-line-number=\"12\"><\/td>\n        <td id=\"file-zoomslider-js-LC12\" class=\"blob-code blob-code-inner js-file-line\">        <span class=pl-c1>&lt;<\/span><span class=pl-ent>Slider<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L13\" class=\"blob-num js-line-number\" data-line-number=\"13\"><\/td>\n        <td id=\"file-zoomslider-js-LC13\" class=\"blob-code blob-code-inner js-file-line\">          <span class=pl-c1>value<\/span><span class=pl-c1>=<\/span><span class=pl-kos>{<\/span><span class=pl-s1>zoom<\/span><span class=pl-kos>}<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L14\" class=\"blob-num js-line-number\" data-line-number=\"14\"><\/td>\n        <td id=\"file-zoomslider-js-LC14\" class=\"blob-code blob-code-inner js-file-line\">          <span class=pl-c1>handleStyle<\/span><span class=pl-c1>=<\/span><span class=pl-kos>{<\/span><span class=pl-kos>{<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L15\" class=\"blob-num js-line-number\" data-line-number=\"15\"><\/td>\n        <td id=\"file-zoomslider-js-LC15\" class=\"blob-code blob-code-inner js-file-line\">            <span class=pl-c1>backgroundColor<\/span>: <span class=pl-s>&#39;#02A8B2&#39;<\/span><span class=pl-kos>,<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L16\" class=\"blob-num js-line-number\" data-line-number=\"16\"><\/td>\n        <td id=\"file-zoomslider-js-LC16\" class=\"blob-code blob-code-inner js-file-line\">            <span class=pl-c1>borderColor<\/span>: <span class=pl-s>&#39;#02A8B2&#39;<\/span><span class=pl-kos>,<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L17\" class=\"blob-num js-line-number\" data-line-number=\"17\"><\/td>\n        <td id=\"file-zoomslider-js-LC17\" class=\"blob-code blob-code-inner js-file-line\">          <span class=pl-kos>}<\/span><span class=pl-kos>}<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L18\" class=\"blob-num js-line-number\" data-line-number=\"18\"><\/td>\n        <td id=\"file-zoomslider-js-LC18\" class=\"blob-code blob-code-inner js-file-line\">          <span class=pl-c1>min<\/span><span class=pl-c1>=<\/span><span class=pl-kos>{<\/span><span class=pl-c1>ZOOM_MIN<\/span><span class=pl-kos>}<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L19\" class=\"blob-num js-line-number\" data-line-number=\"19\"><\/td>\n        <td id=\"file-zoomslider-js-LC19\" class=\"blob-code blob-code-inner js-file-line\">          <span class=pl-c1>max<\/span><span class=pl-c1>=<\/span><span class=pl-kos>{<\/span><span class=pl-c1>ZOOM_MAX<\/span><span class=pl-kos>}<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L20\" class=\"blob-num js-line-number\" data-line-number=\"20\"><\/td>\n        <td id=\"file-zoomslider-js-LC20\" class=\"blob-code blob-code-inner js-file-line\">          <span class=pl-c1>onChange<\/span><span class=pl-c1>=<\/span><span class=pl-kos>{<\/span><span class=pl-s1>onChange<\/span><span class=pl-kos>}<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L21\" class=\"blob-num js-line-number\" data-line-number=\"21\"><\/td>\n        <td id=\"file-zoomslider-js-LC21\" class=\"blob-code blob-code-inner js-file-line\">          <span class=pl-c1>trackStyle<\/span><span class=pl-c1>=<\/span><span class=pl-kos>{<\/span><span class=pl-kos>{<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L22\" class=\"blob-num js-line-number\" data-line-number=\"22\"><\/td>\n        <td id=\"file-zoomslider-js-LC22\" class=\"blob-code blob-code-inner js-file-line\">            <span class=pl-c1>backgroundColor<\/span>: <span class=pl-s>&#39;#5FDCE3&#39;<\/span><span class=pl-kos>,<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L23\" class=\"blob-num js-line-number\" data-line-number=\"23\"><\/td>\n        <td id=\"file-zoomslider-js-LC23\" class=\"blob-code blob-code-inner js-file-line\">          <span class=pl-kos>}<\/span><span class=pl-kos>}<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L24\" class=\"blob-num js-line-number\" data-line-number=\"24\"><\/td>\n        <td id=\"file-zoomslider-js-LC24\" class=\"blob-code blob-code-inner js-file-line\">          <span class=pl-c1>step<\/span><span class=pl-c1>=<\/span><span class=pl-kos>{<\/span><span class=pl-c1>ZOOM_STEP<\/span><span class=pl-kos>}<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L25\" class=\"blob-num js-line-number\" data-line-number=\"25\"><\/td>\n        <td id=\"file-zoomslider-js-LC25\" class=\"blob-code blob-code-inner js-file-line\">        /<span class=pl-c1>&gt;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L26\" class=\"blob-num js-line-number\" data-line-number=\"26\"><\/td>\n        <td id=\"file-zoomslider-js-LC26\" class=\"blob-code blob-code-inner js-file-line\">      <span class=pl-c1>&lt;<\/span>/<span class=pl-ent>div<\/span><span class=pl-c1>&gt;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L27\" class=\"blob-num js-line-number\" data-line-number=\"27\"><\/td>\n        <td id=\"file-zoomslider-js-LC27\" class=\"blob-code blob-code-inner js-file-line\">    <span class=pl-c1>&lt;<\/span>/<span class=pl-ent>div<\/span><span class=pl-c1>&gt;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L28\" class=\"blob-num js-line-number\" data-line-number=\"28\"><\/td>\n        <td id=\"file-zoomslider-js-LC28\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-zoomslider-js-L29\" class=\"blob-num js-line-number\" data-line-number=\"29\"><\/td>\n        <td id=\"file-zoomslider-js-LC29\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-kos>}<\/span><\/td>\n      <\/tr>\n<\/table>\n\n\n  <\/div>\n\n  <\/div>\n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/jplhomer/3cd2598cf6d726231da2218d1966c85c/raw/9c9eb8fb786ec56d15b16322287eb602de62b6a4/ZoomSlider.js\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/jplhomer/3cd2598cf6d726231da2218d1966c85c#file-zoomslider-js\">ZoomSlider.js<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')

document.write('<link rel="stylesheet" href="https://github.githubassets.com/assets/gist-embed-4e64bbf96c31ed6c9ee61f08cea01836.css">')
document.write('<div id=\"gist105966698\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-useeditableimage-js\" class=\"file my-2\">\n    \n\n  <div itemprop=\"text\" class=\"Box-body p-0 blob-wrapper data type-javascript  \">\n      \n<table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\" data-paste-markdown-skip>\n      <tr>\n        <td id=\"file-useeditableimage-js-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-useeditableimage-js-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>async<\/span> <span class=pl-k>function<\/span> <span class=pl-en>processNewImage<\/span><span class=pl-kos>(<\/span><span class=pl-kos>{<\/span> file<span class=pl-kos>,<\/span> imageSize<span class=pl-kos>,<\/span> fileType <span class=pl-kos>}<\/span><span class=pl-kos>)<\/span> <span class=pl-kos>{<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-useeditableimage-js-LC2\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-k>const<\/span> <span class=pl-s1>newImageUrl<\/span> <span class=pl-c1>=<\/span> <span class=pl-k>await<\/span> <span class=pl-en>uploader<\/span><span class=pl-kos>(<\/span><span class=pl-s1>file<\/span><span class=pl-kos>,<\/span> <span class=pl-s1>fileType<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-useeditableimage-js-LC3\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-useeditableimage-js-LC4\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-k>let<\/span> <span class=pl-s1>processedImageUrl<\/span> <span class=pl-c1>=<\/span> <span class=pl-s1>newImageUrl<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-useeditableimage-js-LC5\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-k>const<\/span> <span class=pl-s1>focalPoint<\/span> <span class=pl-c1>=<\/span> <span class=pl-c1>DEFAULT_FOCAL_POINT<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-useeditableimage-js-LC6\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-k>const<\/span> <span class=pl-s1>zoom<\/span> <span class=pl-c1>=<\/span> <span class=pl-c1>DEFAULT_ZOOM<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-useeditableimage-js-LC7\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-useeditableimage-js-LC8\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-k>const<\/span> <span class=pl-s1>processedImage<\/span> <span class=pl-c1>=<\/span> <span class=pl-k>await<\/span> <span class=pl-en>processImage<\/span><span class=pl-kos>(<\/span><span class=pl-kos>{<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-useeditableimage-js-LC9\" class=\"blob-code blob-code-inner js-file-line\">    <span class=pl-c1>url<\/span>: <span class=pl-s1>newImageUrl<\/span><span class=pl-kos>,<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-useeditableimage-js-LC10\" class=\"blob-code blob-code-inner js-file-line\">    focalPoint<span class=pl-kos>,<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L11\" class=\"blob-num js-line-number\" data-line-number=\"11\"><\/td>\n        <td id=\"file-useeditableimage-js-LC11\" class=\"blob-code blob-code-inner js-file-line\">    dimensions<span class=pl-kos>,<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L12\" class=\"blob-num js-line-number\" data-line-number=\"12\"><\/td>\n        <td id=\"file-useeditableimage-js-LC12\" class=\"blob-code blob-code-inner js-file-line\">    fileType<span class=pl-kos>,<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L13\" class=\"blob-num js-line-number\" data-line-number=\"13\"><\/td>\n        <td id=\"file-useeditableimage-js-LC13\" class=\"blob-code blob-code-inner js-file-line\">    zoom<span class=pl-kos>,<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L14\" class=\"blob-num js-line-number\" data-line-number=\"14\"><\/td>\n        <td id=\"file-useeditableimage-js-LC14\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-kos>}<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L15\" class=\"blob-num js-line-number\" data-line-number=\"15\"><\/td>\n        <td id=\"file-useeditableimage-js-LC15\" class=\"blob-code blob-code-inner js-file-line\">  <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L16\" class=\"blob-num js-line-number\" data-line-number=\"16\"><\/td>\n        <td id=\"file-useeditableimage-js-LC16\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-c>// ...<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L17\" class=\"blob-num js-line-number\" data-line-number=\"17\"><\/td>\n        <td id=\"file-useeditableimage-js-LC17\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-kos>}<\/span><\/td>\n      <\/tr>\n<\/table>\n\n\n  <\/div>\n\n  <\/div>\n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/jplhomer/8de722f7fed2cf439e3e922a3974d19b/raw/56a723ffadaa8d44d3a54a05a58d4cd5a209b8b9/useEditableImage.js\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/jplhomer/8de722f7fed2cf439e3e922a3974d19b#file-useeditableimage-js\">useEditableImage.js<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')

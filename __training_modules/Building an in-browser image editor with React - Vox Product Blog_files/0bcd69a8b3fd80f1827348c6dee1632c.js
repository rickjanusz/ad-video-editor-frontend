document.write('<link rel="stylesheet" href="https://github.githubassets.com/assets/gist-embed-4e64bbf96c31ed6c9ee61f08cea01836.css">')
document.write('<div id=\"gist105966785\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-useeditableimage-js\" class=\"file my-2\">\n    \n\n  <div itemprop=\"text\" class=\"Box-body p-0 blob-wrapper data type-javascript  \">\n      \n<table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\" data-paste-markdown-skip>\n      <tr>\n        <td id=\"file-useeditableimage-js-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-useeditableimage-js-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>// See how much &quot;wiggle room&quot; we actuall have to move the scaled image outside the bounds<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-useeditableimage-js-LC2\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>// before we run out of image (and end up with black bars).<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-useeditableimage-js-LC3\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-s1>maxLeft<\/span> <span class=pl-c1>=<\/span> <span class=pl-s1>outputDimensions<\/span><span class=pl-kos>.<\/span><span class=pl-c1>width<\/span> <span class=pl-c1>-<\/span> <span class=pl-s1>newDimensions<\/span><span class=pl-kos>.<\/span><span class=pl-c1>width<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-useeditableimage-js-LC4\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-s1>maxTop<\/span> <span class=pl-c1>=<\/span> <span class=pl-s1>outputDimensions<\/span><span class=pl-kos>.<\/span><span class=pl-c1>height<\/span> <span class=pl-c1>-<\/span> <span class=pl-s1>newDimensions<\/span><span class=pl-kos>.<\/span><span class=pl-c1>height<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-useeditableimage-js-LC5\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-useeditableimage-js-LC6\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>// Now calculate the realistic, usable top and left points, by moving the image as far as we can<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-useeditableimage-js-LC7\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>// (without running out of image, and getting black bars) to respect the focalPoint.<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-useeditableimage-js-LC8\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>// Where \`max*\` is the most we can move in a negative direction, and 0 is the max.<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-useeditableimage-js-LC9\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-s1>realisticLeft<\/span> <span class=pl-c1>=<\/span> <span class=pl-en>clamp<\/span><span class=pl-kos>(<\/span><span class=pl-s1>idealLeft<\/span><span class=pl-kos>,<\/span> <span class=pl-s1>maxLeft<\/span><span class=pl-kos>,<\/span> <span class=pl-c1>0<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-useeditableimage-js-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-useeditableimage-js-LC10\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-s1>realisticTop<\/span> <span class=pl-c1>=<\/span> <span class=pl-en>clamp<\/span><span class=pl-kos>(<\/span><span class=pl-s1>idealTop<\/span><span class=pl-kos>,<\/span> <span class=pl-s1>maxTop<\/span><span class=pl-kos>,<\/span> <span class=pl-c1>0<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n<\/table>\n\n\n  <\/div>\n\n  <\/div>\n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/jplhomer/0bcd69a8b3fd80f1827348c6dee1632c/raw/39a7d84a3d29912b84c82baa7dc74fa5e2ae02a1/useEditableImage.js\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/jplhomer/0bcd69a8b3fd80f1827348c6dee1632c#file-useeditableimage-js\">useEditableImage.js<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')
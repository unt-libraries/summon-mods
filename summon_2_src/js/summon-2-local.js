// Code for Angular 1.6.4
angular.module('summonApp').run(['$templateCache', function (templateCache) {
    const docSummary = "/assets/documentSummary.html";
    const template = templateCache.get(docSummary);
    const $template = jQuery(template);
    // console.log(template);
    // templateCache.put(docSummary, newTemplate);
}]);

// Underscore mixin for joining arrays
_.mixin({
    joinArray: function (arr) {
        return arr.join(', ');
    }
});

// Convert date to YYYY-MM-DD
function dateConvert(date) {
    var parsed = date.match(/(\d\d)?\/?(\d\d)?\/?(\d\d\d\d)$/);
    if (parsed) {
        date = parsed[3] + (parsed[1] ? '-' + parsed[1] + (parsed[2] ? '-' + parsed[2] : '') : '');
    }
    return date;
}

// View document-summary directive scope
angular.module('summonApp.directives').directive("documentSummary", function () {
    return {
        link: function (scope, element) {
            // console.log("scope object in documentSummary directive:");
            // console.dir(scope);
            // console.log("element object in documentSummary directive:");
            // console.log(element);
            // console.log("html generated before directive has finished executing");
            // console.log(element.html());

            // Define constants
            const resultsUrl = window.location.href;
            const formBaseUrl = "https://unt.az1.qualtrics.com/jfe/form/SV_bdw4fydzCuTGPDD";
            const moreSourcesBaseUrl = "https://ui.library.unt.edu/summon-hack/more_sources.php";

            const thisDoc = scope.document;
            const articleTitle = thisDoc.full_title.replace(/<[^>]*>/g, ''); // remove html tags in string
            const articleAuthors = _.chain(thisDoc.authors)
                .pluck('fullname')
                .joinArray()
                .value();
            const publication = scope.summary;
            const journalTitle = thisDoc.publication_title;
            const issn = thisDoc.issns == undefined ? '' : thisDoc.issns.join(', ');
            const date = dateConvert(thisDoc.publication_date);
            const volume = thisDoc.volumes == undefined ? '' : thisDoc.volumes.join(', ');
            const issue = thisDoc.issues == undefined ? '' : thisDoc.issues.join(', ');
            const startPage = thisDoc.start_pages == undefined ? '' : thisDoc.start_pages.join(', ');
            const pages = thisDoc.pages;
            const contentType = thisDoc.content_type;
            const fullTextUrl = thisDoc.has_fulltext ? thisDoc.fulltext_link : '';
            const queryString = "?article_title=" + encodeURIComponent(articleTitle) +
                "&article_authors=" + encodeURIComponent(articleAuthors) +
                "&publication=" + encodeURIComponent(publication) +
                "&journal_title=" + encodeURIComponent(journalTitle) +
                "&issn=" + encodeURIComponent(issn) +
                "&date=" + encodeURIComponent(date) +
                "&volume=" + encodeURIComponent(volume) +
                "&issue=" + encodeURIComponent(issue) +
                "&pages=" + (startPage ? encodeURIComponent(startPage) : encodeURIComponent(pages)) +
                "&content_type=" + encodeURIComponent(contentType) +
                "&url=" + encodeURIComponent(fullTextUrl) +
                "&results_url=" + encodeURIComponent(resultsUrl);
            const formHref = formBaseUrl + queryString;
            const moreSourcesHref = moreSourcesBaseUrl + queryString;

            const formLink = jQuery(`<a class="fancybox" href="${formHref}" title="Report Broken Full-Text Link">Report Broken Link</a>`);
            const moreSourcesLink = jQuery(`<a class="fancybox" href="${moreSourcesHref}" title="Check More Sources to Get the Full Text of this Article">Check More Sources</a>`);

            if (thisDoc.has_fulltext) {
                // div.togglePreview isn't in the DOM yet, so we have to traverse to find these links
                const $togglePreviewParent = element.find('.docFooter').find('.row').last().find('div');
                $togglePreviewParent.append(jQuery(`<div class="unt-more-sources"></div>`).append(moreSourcesLink));
                $togglePreviewParent.append(jQuery(`<div class="unt-rbl"></div>`).append(formLink));

                const brokenLinkHeight = 680 + (Math.floor(articleTitle.length / 80) + Math.floor(articleAuthors.length / 80) + Math.floor(publication.length / 80)) * 40;
                const moreSourcesHeight = brokenLinkHeight - 230;

                jQuery().fancybox({
                    selector: '.unt-rbl .fancybox',
                    type: 'iframe',
                    title: '',
                    iframe: {
                        css: {
                            height: brokenLinkHeight,
                        }
                    },
                    arrows: false,
                    infobar: false,
                    smallBtn: true,
                });

                jQuery().fancybox({
                    selector: '.unt-more-sources .fancybox',
                    type: 'iframe',
                    title: '',
                    iframe: {
                        css: {
                            height: moreSourcesHeight,
                        }
                    },
                    arrows: false,
                    infobar: false,
                    smallBtn: true,
                })
            }
        }
    }
});

// Load fancybox with jQuery
jQuery(function () {
    jQuery('head').append(jQuery('<link rel="stylesheet" type="text/css" />').attr('href', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.6/jquery.fancybox.min.css'));
    jQuery("head").append('<link href="https://ui.library.unt.edu/summon-hack/summon-2-styles-local.css?v=1" media="all" rel="stylesheet" type="text/css" />');
    jQuery.ajax({
        url: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.6/jquery.fancybox.min.js',
        dataType: 'script',
        cache: true
    }).done(function () {
        // Init fancybox links
        const help = jQuery("a:contains('Help')");
        if (help.length) {
            help.fancybox({type: "iframe"});
        }
    })
});
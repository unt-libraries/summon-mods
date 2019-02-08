<?php
$url = 'more_sources.php?' . $_SERVER['QUERY_STRING'];
?>
<!DOCTYPE html>
<html>
<head>
    <title>Thank you for reporting the broken link.</title>
    <link href="summon-docs.css" media="screen" rel="stylesheet" type="text/css" />
</head>
<body>
    <div id="page" style="height:auto; padding:10px 10px 5px 20px;">
        <p><strong style="font-size: 20px;">Thank you.</strong> We'll take a look and contact the system vendor so that they can
            work with the responsible parties to get the issue fixed.</p>
        <p><strong>In the meantime ... </strong></p>
        <p>Just because the link in Find Articles is broken doesn't mean you can't still get your article. There's
            still a good chance that you can get it from <a href="<?php echo $url; ?>">one of these sources</a>!</p>
        <p><strong style="font-size: 20px;">What's up with the broken links</strong>, anyway?</p>
        <p>When you submit a search to Find Articles, you're searching a gigantic index containing documents from over
            136,000 different journals and 7,250 publishers. But Summon, the system powering Find Articles,
            <strong>doesn't actually host the published version of anything in its index</strong>. In fact, where and
            how to get the published version of a document varies from institution to institution depending on what
            journals and database packages the institution subscribes to. So linking you to a copy of your article
            isn't a simple matter of pointing to a single URL where that document resides--it's actually a complex
            negotiation between the Summon service and any number of potential external systems. Often these external
            systems are owned by one of a few different content aggregators--such as EBSCO, ProQuest, Gale, etc. On
            top of this, not all content in Summon can be linked to directly--in some cases you get routed through UNT
            Libraries' link resolver, which might send you to a copy of the journal instead of the exact article.</p>
        <p>When you click a full-text link, Summon first tries to determine where to get the document. If it can link
            you directly to the article, it submits a request for it to the appropriate service. In order to get you
            the correct article, the system has to request it in <em>just the right way</em> using <em>just the right
                data</em>. Since there are no guarantees about data format, quality, or consistency from publisher to
            publisher, aggregator to aggregator, and system to system, any data in the mix that doesn't quite match up
            can make the lookup request fail and block you from accessing your article.</p>
        <p style="font-size:18px;"><strong>The more reports you submit the better the system works for everyone.</strong></p>
    </div>
</body>
</html>
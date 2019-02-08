<?php
$lr_url = 'https://dq4wu5nl3d.search.serialssolutions.com/?ctx_ver=Z39.88-2004&';
$auth_words = preg_split("/(,\s+)|(;\s+)/", $_GET['article_authors']);
$auth_words = preg_split("/\s+/", $auth_words[0]);
$title_words = preg_split("/\s+/", $_GET['article_title']);
$article_lookup_url = $lr_url . 'rft.genre=article&rft.atitle=' . urlencode($_GET['article_title']) . '&rft.au=' . urlencode($_GET['article_authors']) . '&rft.issn=' . urlencode($_GET['issn']) . '&rft.jtitle=' . urlencode($_GET['journal_title']) . '&rft.date=' . urlencode($_GET['date']);
$journal_lookup_url = $lr_url . '&rft.jtitle=' . urlencode($_GET['journal_title']);
$google_title = preg_replace('/\..*$/', '', $_GET['article_title']);
$google_title = preg_replace('/[~`!@#$%^&*()\-_+=\[\{\}\]|:;\'\"<,>.?\/]/', ' ', $google_title);
$google_title = preg_replace('/\s+/', ' ', $google_title);
$google_url = 'https://www.google.com/#q=' . urlencode('"' . $google_title . '"') . (count($title_words) <= 3 ? urlencode(' "' . $_GET['journal_title'] . '"') : '') . ($_GET['article_authors'] && $auth_words[0] != 'Anonymous' ? urlencode(' "' . $auth_words[count($auth_words)-1] . '"') : '');
$google_scholar_url = 'https://scholar.google.com/scholar?q=allintitle:+' . urlencode($google_title) . ($_GET['article_authors'] && $auth_words[0] != 'Anonymous' ? '+author:' . urlencode($auth_words[count($auth_words)-1]) : '');
$illiad_url = 'https://unt.illiad.oclc.org/illiad/illiad.dll/OpenURL?sid=Summon&genre=article&aulast=' . urlencode($_GET['article_authors']) . '&issn=' . urlencode($_GET['issn']) . '&title=' . urlencode($_GET['journal_title']) . '&atitle=' . urlencode($_GET['article_title']) . '&volume=' . urlencode($_GET['volume']) . '&issue=' . urlencode($_GET['issue']) . '&pages=' . urlencode($_GET['pages']) . '&date=' . urlencode($_GET['date']);
?>
<!DOCTYPE html>
<html>
<head>
    <title>More Sources to Get the Full Text of Your Article</title>
    <link href="summon-docs.css" media="screen" rel="stylesheet" type="text/css" />
</head>
<body>
    <div id="page" style="height:auto; padding:5px 0 5px 25px;">
        <!--<pre><?php print_r($_GET); ?></pre>-->
        <div class="summon-citation">
            <div class="article_title"><?php echo urldecode($_GET['article_title']); ?></div>
            <div class="article_authors"><?php echo $_GET['article_authors'] ? 'by ' . urldecode($_GET['article_authors']) : ''; ?></div>
            <div class="publication"><?php echo urldecode($_GET['publication']); ?></div>
        </div>
        <p>If the full-text link to this article in Find Articles doesn't work, try these steps to get it.</p>
        <ol>
            <li class="step"><a href="<?php echo $article_lookup_url; ?>" target="_blank">Look up this article using the e-journal search system</a>. A different provider may have the full text.</li>
            <li class="step"><a href="<?php echo $journal_lookup_url; ?>" target="_blank">Look up <em><?php echo $_GET['journal_title']; ?></em> in the e-journal search system</a>. Then go to the journal (if available), and search/browse for the article.</li>
            <li class="step"><a href="<?php echo $google_url; ?>" target="_blank">Search for the article in Google</a> and <a href="<?php echo $google_scholar_url; ?>" target="_blank">Google Scholar</a>.</li>
            <li class="step"><a href="<?php echo $illiad_url; ?>" target="_blank">Request a copy of the article through Document Delivery / Interlibrary Loan</a> if you still can't find it.</li>
        </ol>
    </div>
</body>
</html>
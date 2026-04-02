<!DOCTYPE html>
<html lang="ru">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">

	<?php wp_head(); ?>

	<?php wp_site_icon(); ?>

	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

	<?php $version = '1'; ?>
	<link rel="stylesheet" href="<?= PATH_DIST ?>styles/main.css?v=<?= $version ?>">
	<link rel="stylesheet" href="<?= PATH_DIST ?>styles/main2.css?v=<?= $version ?>">
	<script type="module" src="<?= PATH_DIST ?>scripts/vendor.js?v=<?= $version ?>"></script>
	<script type="module" src="<?= PATH_DIST ?>scripts/main2.js?v=<?= $version ?>"></script>
	<script src="<?= PATH_ASSETS ?>custom.js?v=<?= $version ?>"></script>
</head>

<body>
	<?php
	// $contacts = get_field('contacts', PAGE_HOME_ID);
	// $general = get_field('general', PAGE_HOME_ID);
	?>
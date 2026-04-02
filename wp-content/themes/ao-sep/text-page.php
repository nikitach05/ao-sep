<?php
/*
Template Name: text-page
*/
?>

<?php get_header(); ?>

<section class="text-page pb-indent mb-indent">
    <div class="container">

        <div class="text-page__title s-title">
            <h1><?php the_title() ?></h1>
        </div>

        <?php the_content() ?>

    </div>
</section>

<?php get_footer(); ?>
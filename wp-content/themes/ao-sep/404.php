<?php

/**
 * The template for displaying 404 pages (not found)
 */

get_header();
?>

<section class="nfp">
    <div class="container">

        <div class="nfp__content">
            <div class="nfp__title">
                <h1>4<span>0</span>4</h1>
            </div>

            <div class="nfp__text">Страница не существует, или в адресе допущена ошибка</div>

            <a href="<?= get_home_url() ?>" class="nfp__btn btn btn--accent">На главную страницу</a>
        </div>

    </div>
</section>

<?php
get_footer();

document.addEventListener('DOMContentLoaded', function() {

    // Articles
    const loadMoreArticles = document.querySelector(".blog-page__load-more");
    if (loadMoreArticles) {
        loadMoreArticles.addEventListener("click", () => {
            const activeCategory = document.querySelector(
                ".filter-categories__item.active"
            );
            if (activeCategory) {
                const termID = activeCategory.dataset.id;
                loadMoreArticlesHandler(termID);
            }
        });
    }

    async function loadMoreArticlesHandler(termID) {
        const data = new FormData();
        data.append("action", "get_articles");
        data.append("term_id", termID);

        let excludeIds = [];
        const visiblePosts = document.querySelectorAll(".article-card");
        visiblePosts.forEach((post) => {
            excludeIds.push(post.dataset.id);
        });

        excludeIds = JSON.stringify(excludeIds);
        data.append("exclude_ids", excludeIds);

        let response = await fetch("/wp-admin/admin-ajax.php", {
            method: "POST",
            body: data,
        });

        let result = await response.text();
        result = JSON.parse(result);

        const container = document.querySelector('.blog-page__items');

        let html = document.createElement("div");
        html.innerHTML = result.posts;
        html = html.querySelectorAll(".article-card");

        if (html.length > 0) {
            html.forEach((item) => {
                container.append(item);
            });
        }

        if (result.is_end == true) {
            const loadMore = document.querySelector(".blog-page__load-more");
            if (loadMore) {
                loadMore.style.display = "none";
            }
        }
    }
});
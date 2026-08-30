/* ========================================
   絞り込み機能
======================================== */
const stageFilter =document.getElementById("stage-filter");
const typeFilter =document.getElementById("type-filter");
const nameSearch =document.getElementById("name-search");
const enemyRows =document.querySelectorAll("#enemy-list tr");
const resultCount =document.getElementById("result-count");
const noResults =document.getElementById("no-results");


/* ========================================
   敵を絞り込む
======================================== */
function filterEnemies() {

    const selectedStage =stageFilter.value;
    const selectedType =typeFilter.value;
    const searchName =nameSearch.value.trim().toLowerCase();

    let visibleCount = 0;


    enemyRows.forEach(row => {
        const enemyName =row.dataset.name;
        const enemyStage =row.dataset.stage;
        const enemyType =row.dataset.type;


        /* ステージ */
        const stageMatch =
            selectedStage === "all" ||
            enemyStage === selectedStage;

        /* 系統 */
        const typeMatch =
            selectedType === "all" ||
            enemyType === selectedType;

        /* 名前 */
        const nameMatch =
            searchName === "" ||
            enemyName
                .toLowerCase()
                .includes(searchName);

        /* 3つ全ての条件を満たした場合 */
        if (
            stageMatch &&
            typeMatch &&
            nameMatch
        ) {
            row.style.display = "";
            visibleCount++;
        } else {
            row.style.display = "none";
        }
    });


    /* 件数を更新 */
    resultCount.textContent =
        visibleCount;
    /* 0件の場合 */
    if (visibleCount === 0) {
        noResults.style.display =
            "block";
    } else {
        noResults.style.display =
            "none";
    }
}


/* ========================================
   セレクトボックス
======================================== */
stageFilter.addEventListener(
    "change",
    filterEnemies
);

typeFilter.addEventListener(
    "change",
    filterEnemies
);


/* ========================================
   名前検索
======================================== */
nameSearch.addEventListener(
    "input",
    filterEnemies
);


/* ========================================
   初期表示
======================================== */
filterEnemies();
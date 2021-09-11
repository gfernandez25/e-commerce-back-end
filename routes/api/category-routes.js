const router = require('express').Router();
const {Category, Product} = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {

    // find all categories
    // be sure to include its associated Products
    Category.findAll({
        include: [
            {
                model: Product,
                as: "products",
                attributes: ["id", "product_name", "price", "stock"]
            }

        ]
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    Category.findByPk(req.params.id, {
        include: [
            {
                model: Product,
                as: "products",
                attributes: ["id", "product_name", "price", "stock"]
            }
        ]
    })
        // Category.findOne({where: {id: req.params.id}})
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => res.status(500).json(err))
});

router.post('/', (req, res) => {
    // create a new category
    const {category_name} = req.body;

    Category.create({category_name})
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update(req.body, {where: {id: req.params.id}})
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({where: {id: req.params.id}})
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({message: 'No category found with this id'});
                return;
            }
            res.json(dbCategoryData);
        })


        .catch(err => res.status(500).json(err))
});

module.exports = router;

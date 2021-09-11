const router = require('express').Router();
const {Tag, Product, ProductTag, Category} = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    Tag.findAll({
        include: [
            {
                model: Product,
                as: "products",
                attributes: ["id", "product_name", "price", "stock"]
            }
        ]
    })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    Tag.findByPk(req.params.id, {
        include: [
            {
                model: Product,
                as: "products",
                attributes: ["id", "product_name", "price", "stock"]
            }
        ]
    })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => res.status(500).json(err))

});

router.post('/', (req, res) => {
    // create a new tag
    Tag.create(req.body)
        .then(dbTagData => res.json(dbTagData))
        .catch(err => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
    Tag.update(req.body, {where: {id: req.params.id}})
        .then(dbTagData => {
            if (!dbTagData) {
                res.status(404).json({message: 'No Tag found with this id'});
                return;
            }
            res.json(dbTagData);
        })

        .catch(err => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
const id = req.params.id
    Tag.destroy({where: {id: req.params.id}})
        .then(dbTagData => {
            if (!dbTagData) {
                res.status(404).json({message: 'No Tag found with this id'});
                return;
            }
            res.json(dbTagData);
        })
        .catch(err => res.status(500).json(err))
});

module.exports = router;

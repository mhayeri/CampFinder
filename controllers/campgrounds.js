const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
};

module.exports.viewCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("author");
    if (!campground) {
        req.flash("error", "Cannot find that campground.");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/details", { campground });
};

module.exports.editCampground = async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    if (!camp) {
        req.flash("error", "Cannot find that campground.");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { camp });
};

module.exports.createCampground = async (req, res, next) => {
    const newCampGround = new Campground(req.body.campground);
    newCampGround.author = req.user._id;
    newCampGround.images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
    }));
    await newCampGround.save();
    console.log(newCampGround);
    req.flash("success", "Successfully made a new campground.");
    res.redirect(`/campgrounds/${newCampGround._id}`);
};

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const camp = await Campground.findByIdAndUpdate(id, {
        ...req.body.campground,
    });
    camp.images.push(
        ...req.files.map((f) => ({
            url: f.path,
            filename: f.filename,
        }))
    );
    await camp.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await camp.updateOne({
            $pull: { images: { filename: { $in: req.body.deleteImages } } },
        });
    }
    req.flash("success", "Successfully updated campground.");
    res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully removed campground.");
    res.redirect("/campgrounds");
};

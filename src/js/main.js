// Image data
var images = [ 
    {
        image: "http://www.fondosgratis.mx/imagenItem/4804/1024/1.jpg",
        likes: 0
    }, 
    {
        image: "http://onehdwallpaper.com/wp-content/uploads/2015/07/Free-Download-Mountain-Hd-Wallpapers.jpg",
        likes: 0 
    }, 
    {
        image: "https://photosbyravi.files.wordpress.com/2013/03/a-mountain-backdrop.jpg",
        likes: 0
    }];

// Create Collection of images
var collection = new Backbone.Collection(images);

var firstInput = $('#add');

firstInput.on('keyup', function (e) {
    if (e.keyCode === 13) {
        collection.add({
            image: firstInput.val(),
            likes: 0
        });
        firstInput.val('');
    }
})

function AppView (collection) {
        var _this = this
        this.el = $('<div></div>', {
                class: 'app'
                });

        this.collection = collection;
        this.collection.on('add remove', this.render.bind(this));
            
    }

AppView.prototype.render = function () {
        var _this = this;

        this.el.empty();

        this.collection.each(function (model) {
                var imageView = new ImageView(model);
                imageView.render();
                _this.el.append(imageView.el)
            });
        };

function ImageView (model) {
    this.el = $('<div></div>', {
                class: 'pictureBox'
                }); 
    this.model = model;
    var _this = this
    model.on('change', this.render.bind(this));

    this.el.on('click', '.likes', function () {
        _this.model.set('likes', _this.model.get('likes') + 1);
        $('.likes').text(_this.model.get('likes'));
    });

    this.el.on('click', '.delete', function () {
        _this.model.destroy();
    });
}

ImageView.prototype.render = function () {
    var _this = this;
    this.el.html(`
        <img src= '${this.model.get('image')}'>
        <label class="likesLabel">Likes</label>
        <button class='likes'>${this.model.get('likes')}</button>
        <button class='delete'>Delete</button>
    `);
}

var appView = new AppView(collection);

appView.render()

$(document.body).append(appView.el);


THREE.LodTextureLoader = function () {

    var _obj;
    var _imgs;
    var loader = new THREE.TextureLoader();
    var _id;
      
    //progressively loads images to object
    this.load = function (imageSetId, object, images)
    {
        
        //console.log("LodTextureLoader: load()");
         _obj = object;
        _imgs = images;
        _id = imageSetId;
        getTexture(0);        
    }

    function getTexture(i)
    {
        var loadingId = _id;
        _obj.visible = false;   //workaround instead of calling needsUpdate
        loader.load(_imgs[i],
            function(img) {
                if (loadingId != _id){
                    return; // loaded another imageset, before prev img was returned
                }

                //console.log("loaded image: " + _imgs[i]);
                //Lesson Learned 2/8/2019: need to dispose prev texture and do not call needsUpdate; will not run on mobile
                if( _obj.material.map){
                     _obj.material.map.dispose();
                }
                _obj.material.map = img;
                _obj.visible = true; //workaround instead of calling needsUpdate
                //_obj.material.needsUpdate = true; //bad! will not run on mobile
                
                //load next lod
                i += 1;
                if( i < _imgs.length )
                {
                    getTexture(i);
                }
                
                
            },
            function(xhr) {
            }, //progress
            function(error){
                console.log('LodTextureLoader Error: ' + error);
            });
        
    }

};

THREE.LodTextureLoader.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.LodTextureLoader.prototype.constructor = THREE.LodTextureLoader;

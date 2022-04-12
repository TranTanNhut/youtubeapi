$(document).ready(function(){
    var imageLink;
    var width;
    var height;
    let title;
    var totalViews;
    var totalSubscribers;
    var totalVideos;
    let channelId = $("#search").val();
    var url;
    var API_KEY = "AIzaSyCxQznORkrVEClZ4DoZTir2TyBKf1hFty4";
    var video = '';
    var videos = $("videos");
    $("#seeVideo").click(function(){
        console.log("hello")
         channelId = $("#search").val();
        
        
        videoSearch(API_KEY,title,10);

    })
    function videoSearch(key,search,maxResult){
        $.get(`https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${maxResult}&q=${search}`,function(data){
            
            $("#videos").html("");
            data.items.forEach(element => {
                video = `<iframe width="50%" height="315" src="https://www.youtube.com/embed/${element.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                
                $("#videos").append(video)
              
            });
            addPlayList();
        });
        
    }
  
    $("form").submit(function(){    
        //fetch the value that  is entered into the input field

        channelId = $("#search").val();
        
        // we will make the request to the youtube api
        //API KEY AIzaSyCxQznORkrVEClZ4DoZTir2TyBKf1hFty4 
        url = `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${channelId}&part=snippet,contentDetails,statistics`;
        $.get(url,function(data){
            
            fetchData(data);
            bindData(imageLink,width,height,title,totalSubscribers,totalViews,totalVideos);
            
        });

        return false
    });
    function fetchData(data){
        imageLink = data.items[0].snippet.thumbnails.medium.url;
        width = data.items[0].snippet.thumbnails.medium.url.width;
        height = data.items[0].snippet.thumbnails.medium.url.height;
        title = data.items[0].snippet.title;
        totalSubscribers = data.items[0].statistics.subscriberCount;
        totalViews = data.items[0].statistics.viewCount;
        totalVideos = data.items[0].statistics.videoCount;
    }

    function bindData(imageLink,width,height,title,totalSubscribers,totalViews,totalVideos) {
        $("#thumbnail").attr("src",imageLink);
        $("#thumbnail").attr("width",width);
        $("#thumbnail").attr("height",height);
        $("#title").html(title);
        $("#subcribers").html("Tổng số lượt theo dõi : " + totalSubscribers);
        $("#totalViews").html("Tổng số lượt xem kênh : " + totalViews);
        $("#totalVideos").html("Tổng số video trên kênh : " + totalVideos);
       
    }

    function addPlayList(){
        $("#playlist").html("")
        url = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&part=contentDetails,snippet,status&channelId=${channelId}`
            $.get(url,function(data){
            $("#playlist").append(`<h1 class="text-primary text-center p-3">PlayList</h1>`)
            data.items.forEach(e=>{
                
                $("#playlist").append(`<div class="col-6">
                    <div class="card" style="width: 18rem;">
                    <img src="${e.snippet.thumbnails.medium.url}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <p class="card-text">Tên playlist : ${e.snippet.title} </br> 
                        Tổng số video : ${e.contentDetails.itemCount} </br>
                        Link : <a href="https://www.youtube.com/watch?list=${e.id}">Click</a>
                    </p>
                    </div>
                </div>
                </div>`)
            })
        })

    }

});
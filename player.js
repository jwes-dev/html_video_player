function VideoPlayer(video_id)
{
    this.video = document.getElementById(video_id);
    $(this.video).removeAttr("controls");
    $("#"+video_id).wrap('<div class="screen" id="'+video_id+'_parent"></div>');
    $("#"+ video_id+"_parent").append('<div class="controls">'+
        '<i class="material-icons control-button" id="' + video_id + '_play_pause">pause</i>'+
        '<input type="range" min="1" max="100" class="slider" id="' + video_id + '_seeker">'+
        '<a class="material-icons control-button" href="images/sample.mp4" download>save_alt</a>'+
    '</div>');
    this.seeker = document.getElementById(video_id+"_seeker");
    this.seek = true;
    this.play_pause = document.getElementById(video_id+"_play_pause");
    if(this.video.playing)
        $(this.play_pause).html("pause");
    else
        $(this.play_pause).html("play_arrow");

    this.video.onended = function()
    {
        this.video.currentTime = 0; 
        $(this.play_pause).html("play_arrow");
    }.bind(this);

    this.video.onplaying = function()
    {
        $(this.play_pause).html("pause");
    }.bind(this);

    this.video.onpause = function()
    {
        $(this.play_pause).html("play_arrow");
    }.bind(this);

    $(this.seeker).mousedown(function(){
        this.seek = false;
    }.bind(this));
    
    $(this.seeker).mouseup(function(){
        this.seek = true;
        this.video.currentTime = this.seeker.value * this.video.duration / 100;
    }.bind(this));

    $(this.seeker).change(function(){
        this.video.currentTime = this.seeker.value * this.video.duration / 100;
        this.seek = true;
    }.bind(this));

    $(this.play_pause).click(function(){
        if(this.video.paused)
        {
            this.video.play();
        }
        else
        {
            this.video.pause();
        }
    }.bind(this));
    setInterval(function(){
        if(this.seek)
            this.seeker.value = (this.video.currentTime*100/this.video.duration);
    }.bind(this), 0.1);
}


function PlayerForAll()
{
    $("video").each(function(){
        if($(this).attr("id") == "")
        {
            $(this).attr("id", "vpl"+this.id)
            this.id++;
        }
        new VideoPlayer($(this).attr("id"));
    });
}
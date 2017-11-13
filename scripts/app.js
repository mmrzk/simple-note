angular.module("notes", [])
.controller("notesCtrl", function()
{
	this.currText = "";
	this.tiles = angular.fromJson(localStorage.getItem("tiles")) || [];
	this.editIndex = -1;

	this.addNote = function()
	{
		if(this.currText && this.currText.length>0){
			if(this.editIndex>=0)
			{
				this.tiles[this.editIndex]["text"]=this.currText;
			}
			else{
				this.tiles.push({"text": this.currText});
			}

			localStorage.setItem("tiles", angular.toJson(this.tiles));
			this.currText="";
		}
	};

	this.clear = function()
	{
		this.editIndex=-1;
		this.currText="";
	};

	this.insertText = function(index)
	{
		this.editIndex=index;
		this.currText=this.tiles && this.tiles[index] && this.tiles[index].text || '';
	};

	this.remove = function(index, $event)
	{
		if(index>=0 && this.tiles.length>index)
		{
			this.tiles.splice(index, 1);
			localStorage.setItem("tiles", angular.toJson(this.tiles));
		}
		if($event.stopPropagation) $event.stopPropagation();
		if($event.preventDefault) $event.preventDefault();
		$event.cancelBubble=true;
		$event.returnValue=false;
	};
});
function search(matchValue) {
	var searchStr = matchValue || document.querySelector("#searchItem").value,
		cellList = document.querySelectorAll(".content .table > .table-row-group > .table-row > .table-cell");
	
	removeChildNodesHide(document.querySelector(".content"));
	resetLightFont();
	if(searchStr && searchStr.trim()){
		var searchStrArray = searchClue(searchStr);
			displayCell(searchStrArray,cellList);
	}
}

function searchClue(searchStr){
	var searchStrArray = [searchStr],
		clueCellList = document.querySelectorAll(".content .table.clue > .table-row-group > .table-row > .table-cell.clue-cell");
	for(var cu = 0; cu < clueCellList.length; cu++){
		var $currentClueCell = clueCellList[cu],
			clueHTML = $currentClueCell.innerHTML;
		if(clueHTML.indexOf(searchStr) > -1){
			var clueValue = $currentClueCell.parentNode.querySelectorAll(".table-cell")[1].innerHTML;
			if(searchStrArray.indexOf(clueValue) === -1){
				searchStrArray.push(clueValue);
			}
		}
	}
	return searchStrArray;
}

function displayCell(searchStrArray,cellList){
	for (var i = 0; i < cellList.length; i++) {
		var $currentCell = cellList[i],
			innerHTML = $currentCell.innerHTML,
			matchResult = indexOfArray(innerHTML,searchStrArray);
		if (matchResult.result) {
			$currentCell.classList.remove("hide");
			for(var ma = 0; ma < matchResult.matchArray.length; ma++){
				var matchStr = matchResult.matchArray[ma],
					lightHtml = "<span class='light'>"+matchStr+"</span>";
//				$currentCell.innerHTML = innerHTML.replace(searchStr,lightHtml);
				$currentCell.innerHTML = innerHTML.split(matchStr).join(lightHtml);//replaceAll
			}
//			if($currentCell.classList.contains("clue-cell")){
//				var matchValue = $currentCell.parentNode.querySelectorAll(".table-cell")[1].innerHTML;
//				if(matchValue && matchValue.trim()){
//					search(matchValue);
//					return;
//				}
//			}
		} else if($currentCell.querySelectorAll("span.light").length === 0){
			$currentCell.classList.add("hide");
		}
	}

	displayChapter();
}

function displayChapter(){
	var tableList = document.querySelectorAll(".content .table");
	for(var t = 0; t < tableList.length; t++){
		var $currentTable = tableList[t],
			groupList = $currentTable.querySelectorAll(".table-row-group");
		
		for(var g = 0; g < groupList.length; g++){
			var $currentGroup = groupList[g],
				rowList = $currentGroup.querySelectorAll(".table-row");
			
			for(var r = 0; r < rowList.length; r++){
				var $currentRow = rowList[r];
				if($currentRow.querySelectorAll(".table-cell:not(.hide)").length === 0){
					$currentRow.classList.add("hide");
				}else{
					$currentRow.classList.remove("hide");
					removeChildNodesHide($currentRow);
				}
			}
			
			if($currentGroup.querySelectorAll(".table-row:not(.hide)").length === 0){
				$currentGroup.classList.add("hide");
			}else{
				$currentGroup.classList.remove("hide");
				var $currentGroupHeader = $currentGroup.querySelector(".table-row.chapter-header"),
					$currentGroupContent = $currentGroup.querySelectorAll(".table-row:not(.chapter-header)");
				if($currentGroupHeader.classList.contains("hide")
						&& $currentGroupContent[0].querySelectorAll(".table-cell")[0].innerHTML.indexOf("回合") === -1){
					$currentGroupHeader.classList.remove("hide");
					removeChildNodesHide($currentGroupHeader);
				}else{
					for(var rr = 0; rr < rowList.length; rr++){
						var $currentRow = rowList[rr];
						$currentRow.classList.remove("hide");
						removeChildNodesHide($currentRow);
					}
				}
			}	
		}
		
		if($currentTable.querySelectorAll(".table-row-group:not(.hide)").length === 0){
			$currentTable.classList.add("hide");
		}else{
			$currentTable.classList.remove("hide");
		}
	}
}

function removeChildNodesHide(element){
	var childNodes = element.querySelectorAll(".hide");
	for(var n = 0 ; n < childNodes.length; n++){
		childNodes[n].classList.remove("hide");
	}
}

function resetLightFont(){
	var lights = document.querySelectorAll("span.light");
	for(var l = 0; l < lights.length; l++){
		var $currentLight = lights[l];
		$currentLight.outerHTML = $currentLight.innerHTML;
	}
}

function indexOfArray(str,array){
	var matchResult = {
		"result": false,
		"matchArray": []
	}
	for(var i=0; i< array.length; i++){
		if(str.indexOf(array[i]) > -1){
			matchResult.result = true;
			matchResult.matchArray.push(array[i]);
		}
	}
	return matchResult;
}
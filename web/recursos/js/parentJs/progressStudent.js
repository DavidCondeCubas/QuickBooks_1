function initProgress(url) {
    resetNavInf();
    currentOption = "progressStudent";
    $("#navInfProgress").empty();

    $("#navInfProgress").append("<img src='" + url + "' data-toggle='tooltip' data-placement='top' title='Student Progress'>");
    menu("progressStudent");
  //  $("#navInfReport").hide();
    //$("#navInfMore").attr("value", "a_MenuIcon.svg");
}

function initProgressMenu(url) {
    currentOption = "progressStudent";
    getRating_Student();
    $("#navInfProgress").empty();

    $("#navInfProgress").append("<img src='" + url + "' data-toggle='tooltip' data-placement='top' title='Student Progress'>");
    $("#progressStudent").show();

}

function getRating_Student() {
    var id = currentStudent;
    $("#mySidenav").empty();
    $("#accordion").empty();
    $("#subjectProgress").empty();
    $.ajax({
        type: "POST",
        url: "getSubjectsStudents.htm?seleccion=" + id,
        data: id,
        dataType: 'text',
        success: function (data) {
            var data = JSON.parse(data);
            var subjects = JSON.parse(data.subjects);
            mapFinalRatings = JSON.parse(data.mapFinalRatings);

            $("#mySidenav").empty();
            $("#mySidenav").append(" <a href='javascript:void(0)' class='closebtn' onclick='closeNav()'><span class='glyphicon glyphicon-remove'></span</a>");

            subjects.sort(function(a,b) {return (mapSubjects[a].name > mapSubjects[b].name) ? 1 : ((mapSubjects[b].name > mapSubjects[a].name) ? -1 : 0);} ); 
            
            for (var i = 1; i < subjects.length; i++) {
                $("#mySidenav").append("<a id='" + subjects[i] + "' href='#' class='animated zoomIn subjectsMenu'>" + mapSubjects[subjects[i]].name +"\
<span class='badge badge-light'>"+countObjectives(subjects[i])+"</span></a>");
            }

            $(".subjectsMenu").click(function () {
                $(".subjectsMenu").css({'color': '', 'font-weight': ''});
                $(this).css({'color': 'black', 'font-weight': 'bold'});
                showObjectivesRatings($(this).attr("id"));
                closeNav();
            });
            var firstSubject = $("#mySidenav").children().first().next().attr("id");
            if (firstSubject !== undefined)
                showObjectivesRatings(firstSubject);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            console.log(thrownError);
        }
    });
}
function countObjectives(idSubjects){
    var cont =0;
    $.each(mapFinalRatings, function (key, value) {
        if (mapObjectives[key.split("_")[1]].idSubject == idSubjects) {
            cont++;
        }
    });
    return cont;
}

function  showObjectivesRatings(idSubject) {
    var currentMonth = new Date();

    $("#accordion").empty();
    $("#subjectProgress").empty();

    $("#subjectProgress").append("<div class='col-xs-3' onclick='openNav()'><span class='glyphicon glyphicon-chevron-left'></span><span>Subjects</span></div>");
    $("#subjectProgress").append("<div class='col-xs-offset-7 col-xs-2 col-md-3 col-xs-offset-6'>" + monthNames[currentMonth.getMonth()] + "</div>");
    $("#subjectProgress").append("<div class='col-xs-12 col-md-12'>" + (mapSubjects[idSubject].name).toUpperCase() + "</div>");

    var arr = [];

    $.each(mapFinalRatings, function (key, value) {
        if (mapObjectives[key.split("_")[1]].idSubject == idSubject) {
            arr.push({
                name: mapObjectives[key.split("_")[1]].name,
                rating: value,
                description: mapObjectives[key.split("_")[1]].description
            });
        }
    });

    arr.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} ); 
    if(arr.length === 0){
        $("#accordion").append("<div class='card '>\n\
                                                <div class='card-header'>\n\
                                                        <a class='collapsed card-link' data-toggle='collapse' >\n\
                                                          <div>\n\
                                                            Without qualified objectives\n\
                                                          </div>\n\
                                                        </a>\n\
                                                </div>\n\
                                </div>");
    }
    $.each(arr, function (key, value) {
      //  if (mapObjectives[key.split("_")[1]].idSubject == idSubject) {
            $("#accordion").append("<div class='card '>\n\
                                                <div class='card-header'>\n\
                                                        <a class='collapsed card-link' data-toggle='collapse' href='#collapse" + key + "'>\n\
                                                            <div >\n\
                                                            " + value.name + "\
                                                            </div>\n\
                                                        </a>\n\
                                                        <div>\n\
                                                                <div class='progress nopadding'>\n\
                                                                " + drawRating(value.rating) + "\n\
                                                                </div>\n\
                                                            </div>\n\
                                                </div>\n\
                                                <div id='collapse" + key + "' class='collapse' data-parent='#accordion'>\n\
                                                    <div class='card-body' style='text-align:  justify;'>\n\
                                                        " + value.description + "\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>");
        }

        /*   $("#accordionWhats").append("<div class='card'>\n\
         <div class='card-header'>\n\
         <a class='collapsed card-link' data-toggle='collapse' href='#collapse"+i+"'>\n\
         <div>\n\
         <img src='../ParentWeb/recursos/img/iconos/target.svg' alt='image' />\n\
         <div>" + mapObjectives[arrayData[i].idObjective].name + "</div>\n\
         </div>\n\
         </a>\n\
         <div class= 'accorSteps'>"+makeSteps(objSuccess,totalSteps)+"</div>\n\
         </div>\n\
         <div id='collapse"+i+"' class='collapse' data-parent='#accordion'>\n\
         <div class='card-body'>\n\
         <ul id='menu'>"+makeNamesObjectives(objSuccess,totalSteps,mapObjectives[arrayData[i].idObjective].arraySteps)+"</ul>\n\
         </div>\n\
         </div>\n\
         </div>");*/
   // }
    );
    $(function () {
        var $self = $(this);
        var sortedList = $('.identifier-controls', $self).sort(function (lhs, rhs) {
            return parseInt($(lhs).attr("data-order"), 10) - parseInt($(rhs).attr("data-order"), 10);
        });
    });
    /*
     $.each(mapFinalRatings, function (key, value) {
     if (mapObjectives[key.split("_")[1]].idSubject == idSubject) {
     $("#accordion").append("<div class='card '>\n\
     <div class='card-header col-xs-12' id='heading" + key + "'>\n\
     <h5 class='mb-0' style='width:100%'\n\
     <button class='btn btn-link collapsed col-xs-12 nopadding' data-toggle='collapse' data-target='#collapse" + key + "' aria-expanded='false' aria-controls='collapse" + key + "'>\n\
     <div class='col-xs-12 nopadding text-left'>\n\
     " + mapObjectives[key.split("_")[1]].name + "\
     </div>\n\
     <div class='col-xs-12 nopadding text-center'>\n\
     <div class='progress col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 nopadding'>\n\
     " + drawRating(value) + "\n\
     </div>\n\
     </div>\n\
     </button>\n\
     </h5>\n\
     </div>\n\
     <div id='collapse" + key + "' class='collapse text-center' aria-labelledby='heading" + key + "' data-parent='#accordion'>\n\
     <div class='card-body'>\n\
     " + mapObjectives[key.split("_")[1]].description + "\n\
     </div>\n\
     </div>\n\
     </div>");
     }
     });
     $.each(mapFinalRatings, function (key, value) {
     if (mapObjectives[key.split("_")[1]].idSubject == idSubject) {
     $("#accordion").append("<div class='card '>\n\
     <div class='card-header col-xs-12' id='heading" + key + "'>\n\
     <h5 class='mb-0' style='width:100%'\n\
     <button class='btn btn-link collapsed col-xs-12 nopadding' data-toggle='collapse' data-target='#collapse" + key + "' aria-expanded='false' aria-controls='collapse" + key + "'>\n\
     <div class='col-xs-12 nopadding text-left'>\n\
     " + mapObjectives[key.split("_")[1]].name + "\
     </div>\n\
     <div class='col-xs-12 nopadding text-center'>\n\
     <div class='progress col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 nopadding'>\n\
     " + drawRating(value) + "\n\
     </div>\n\
     </div>\n\
     </button>\n\
     </h5>\n\
     </div>\n\
     <div id='collapse" + key + "' class='collapse text-center' aria-labelledby='heading" + key + "' data-parent='#accordion'>\n\
     <div class='card-body'>\n\
     " + mapObjectives[key.split("_")[1]].description + "\n\
     </div>\n\
     </div>\n\
     </div>");
     }
     });*/
}
function drawRating(rating) {
    var res = "<div class='progress-bar progress-bar-striped active progressAttempted' role='progressbar'aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' >\n\
                            Attempted \n\
                        </div> ";
    if (rating === "Presented" || rating === "Mastered") {
        res += " <div class='progress-bar progress-bar-striped active progressPresented' role='progressbar'aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' >\n\
                            Presented \n\
                        </div> "
        if (rating === "Mastered") {
            res += " <div class='progress-bar progress-bar-striped active progressMastered' role='progressbar'aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' >\n\
                            Mastered \n\
                        </div> "
        }
    }
    return res;

}

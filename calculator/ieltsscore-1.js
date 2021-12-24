$(document).ready(function () {
    initView();
    $(".btn-calculate").click(function () {

        var exam_type = $('input:radio[name="ExamType"]:checked').val();
        var listening_score = parseInt($('#listening-score').val());
        var reading_score = parseInt($('#reading-score').val());
        if (isNaN(listening_score))
            listening_score = 0;
        if (isNaN(reading_score))
            reading_score = 0;
        var flag = controlColorHint(exam_type, listening_score, reading_score, $('#listening-score').val(), $('#reading-score').val());
        if (flag != true) {
            var listening_band = calculateListenBand(listening_score);
            var reading_band;
            if (exam_type == "Academic")
                reading_band = calculateReadingBandA(reading_score);
            else
                reading_band = calculateReadingBandG(reading_score);
            $(".div-content").hide();
            $(".div-result").show();


            $("#listening-band").html(listening_band);
            $("#reading-band").html(reading_band);

            if (isNaN(parseInt($('#listening-score').val()))) {
                $("#listening-band").css({
                    "visibility": "hidden"
                });
            }
            if (isNaN(parseInt($('#reading-score').val()))) {
                $("#reading-band").css({
                    "visibility": "hidden"
                });
            }

        }

    });

    $(".btn-do-again").click(function () {
        $(".div-result").hide();
        $(".div-content").show();
        $('#listening-score').val('');
        $('#reading-score').val('');
        $(".color-listening").css({
            "color": "black"
        });
        $(".color-reading").css({
            "color": "black"
        });
        $("#reading-band").css({
            "visibility": "visible"
        });
        $("#listening-band").css({
            "visibility": "visible"
        });

    });
    $(".btn-regist").click(function () {

        window.open("https://www.ieltsscore.com/ielts-listening/", "_blank");
    });
});
/* AR <div class='content upper-text' style='margin-top: 20px;'> 
      <input id='listening-score' type='text' size='4' style='text-align: center;width:38px;'> */
function initView() {
    var init_html = "\<div class='calculator' style='position:relative;'>\
    <div id='hide2Text' >Please remember that we calculate these IELTS band score based on your own assessment of your strengths and weaknesses in different parts of the IELTS test. You are not guaranteed to get these score results in the actual test.</div>\
    <div class='calculator-upper'>\
        <div class='upper-title' style='padding-left: 22px;padding-right: 22px;'><h2><u><a href='https://www.ieltsscore.com/calculator/'>IELTS Score Calculator</a></u></h2></div>\
        </div>\
    <div class='div-content' id='calculator-2-1'>\
        <div class='row-left-description'>\
        <div class='content upper-text' style='margin-top: 10px;'>How many questions did you get right in the IELTS Exam papers?</div>\
        </div>\
    <div class='row-select'>\
        <div class='ui image header'>\
        <img src='https://www.ieltsscore.com/wp-content/themes/ScholarshipsinEurope/assets/img/listening.png' class='ui mini rounded image marginleft'>\
        <div class='content'>Listening</div>\
        <div class='content right-float color-listening'>\
        <input id='listening-score' type='text' size='4' style='text-align:center;width:120px;height:30px;margin:0 5px;'> of 40\
    </div>\
    </div>\
    </div>\
    <div class='row-select'>\
        <div class='ui image header'>\
        <img src='https://www.ieltsscore.com/wp-content/themes/ScholarshipsinEurope/assets/img/reading.png' class='ui mini rounded image marginleft'>\
        <div class='content'>Reading</div>\
        <div class='content right-float color-reading'>\
        <input id='reading-score' type='text' size='3' style='text-align:center;width:120px;height:30px;margin:0 5px;'> of 40\
    </div>\
    </div>\
    </div>\
    <div class='row-left-description' style='margin-bottom:0px;'>\
        <div class='content upper-text'>Which exam are you taking?</div>\
    </div>\
    <div class='row-left-description'>\
        <form class='color-radio'>\
        <div class='row-select content select-radio'>\
        <input type='radio' name='ExamType' value='Academic' style='height:auto;margin-right:20px;'/>Academic\
        </div>\
        <div class='row-select content select-radio'>\
        <input type='radio' name='ExamType' value='General Training'  style='height:auto;margin-right:20px;'/>General Training\
    </div>\
    </form>\
    </div>\
    <div class='row-submit'>\
        <button class='ui button special btn-calculate' style='margin-top: 11px;' type='submit'>Calculate</button>\
        </div>\
        </div>\
        <!-- calculator result view -->\
    <div class='div-result' style='display: none'>\
        <div class='row-select' align='center'>\
        <div class='content color-grey' style='float: none;text-align: center;margin: 15px;color: #008000;'>Your score:</div>\
        <div class='ui image header'> <img src='https://www.ieltsscore.com/wp-content/themes/ScholarshipsinEurope/assets/img/listening.png' class='ui mini rounded image marginleft'> <div class='content'> Listening</div>\
            <div class='content middle' id='listening-band' style='font-size: 24px;color: #be3e4c;'></div>\
        </div>\
        <div class='ui image header'> <img src='https://www.ieltsscore.com/wp-content/themes/ScholarshipsinEurope/assets/img/reading.png' class='ui mini rounded image marginleft'> <div class='content'> Reading&nbsp;&nbsp;</div>\
            <div class='content middle' id='reading-band' style='font-size: 24px;color: #be3e4c;'></div>\
        </div>\
        <div class='content color-grey' onmouseover='show2Text();' onmouseout='hide2Text();' style='float: none;text-align: center;color: #008000;width: 100%;'><p style='text-align: center;'>These scores are estimates only.</p></div>\
    <button class='ui button second special btn-regist' type='submit'>Take Sample Test</button> \
    <button class='ui button second special btn-do-again'><img src='https://www.ieltsscore.com/wp-content/themes/ScholarshipsinEurope/assets/img/repeat.png' width='12px' style='vertical-align: middle;'>&nbsp;&nbsp;Do it again</button>\
    <br>\
    </div>\
    </div>\
    </div>";
    $("#calculator-2").html(init_html);
}

function controlColorHint(exam_type, listening_score, reading_score, listening_val, reading_val) {
    var flag = false;
    $(".color-listening").css({
        "color": "black"
    });
    $(".color-reading").css({
        "color": "black"
    });
    if (listening_score < 0 || listening_score > 40 || (!$.isNumeric(listening_val))) {
        if (listening_val != '') {
            $(".color-listening").css({
                "color": "red"
            });
            flag = true;
        }

    } else {
        $(".color-listening").css({
            "color": "black"
        });
    }
    if (reading_score < 0 || reading_score > 40 || (!$.isNumeric(reading_val))) {
        if (reading_val != '') {
            $(".color-reading").css({
                "color": "red"
            });
            flag = true;
        }

    } else {
        $(".color-reading").css({
            "color": "black"
        });
    }
    if (exam_type == null) {
        $(".color-radio").css({
            "color": "red"
        });
        flag = true;
    } else {
        $(".color-radio").css({
            "color": "black"
        });
    }
    if (listening_val == '' && reading_val == '') {
        $(".color-listening").css({
            "color": "red"
        });
        $(".color-reading").css({
            "color": "red"
        });
        flag = true;
    }
    return flag;
}

function calculateListenBand(listening_score) {
    switch (listening_score) {
        case 40:
        case 39:
            return 9;
        case 38:
        case 37:
            return 8.5;
        case 36:
        case 35:
            return 8;
        case 34:
        case 33:
            return 7.5;
        case 32:
        case 31:
        case 30:
            return 7;
        case 29:
        case 28:
        case 27:
            return 6.5;
        case 26:
        case 25:
        case 24:
        case 23:
            return 6;
        case 22:
        case 21:
        case 20:
            return 5.5;
        case 19:
        case 18:
        case 17:
        case 16:
            return 5;
        case 15:
        case 14:
        case 13:
            return 4.5;
        case 12:
        case 11:
        case 10:
        case 9:
            return 4;
        case 8:
        case 7:
        case 6:
        case 5:
            return 3;
        case 4:
        case 3:
            return 2;
        case 2:
        case 1:
            return 1;
        case 0:
            return 0;
    }
}

function calculateReadingBandA(reading_score) {
    switch (reading_score) {
        case 40:
        case 39:
            return 9;
        case 38:
        case 37:
            return 8.5;
        case 36:
        case 35:
            return 8;
        case 34:
        case 33:
            return 7.5;
        case 32:
        case 31:
        case 30:
            return 7;
        case 29:
        case 28:
        case 27:
            return 6.5;
        case 26:
        case 25:
        case 24:
        case 23:
            return 6;
        case 22:
        case 21:
        case 20:
        case 19:
            return 5.5;
        case 18:
        case 17:
        case 16:
        case 15:
            return 5;
        case 14:
        case 13:
        case 12:
            return 4.5;
        case 11:
        case 10:
        case 9:
            return 4;
        case 8:
        case 7:
        case 6:
        case 5:
            return 3;
        case 4:
        case 3:
            return 2;
        case 2:
        case 1:
            return 1;
        case 0:
            return 0;
    }
}

function calculateReadingBandG(reading_score) {
    switch (reading_score) {
        case 40:
        case 39:
            return 9;
        case 38:
            return 8.5;
        case 37:
            return 8;
        case 36:
            return 7.5;
        case 35:
        case 34:
            return 7;
        case 33:
        case 32:
            return 6.5;
        case 31:
        case 30:
            return 6;
        case 29:
        case 28:
        case 27:
            return 5.5;
        case 26:
        case 25:
        case 24:
        case 23:
            return 5;
        case 22:
        case 21:
        case 20:
        case 19:
            return 4.5;
        case 18:
        case 17:
        case 16:
        case 15:
            return 4;
        case 14:
        case 13:
        case 12:
            return 3;
        case 11:
        case 10:
        case 9:
        case 8:
            return 2;
        case 7:
        case 6:
        case 5:
        case 4:
            return 1;
        case 3:
        case 2:
        case 1:
        case 0:
            return 0;
    }
}

function show2Text() {
    $("#hide2Text").css({
        "display": "block",
    });
}
function hide2Text() {
    $("#hide2Text").css({
        "display": "none"
    });
}

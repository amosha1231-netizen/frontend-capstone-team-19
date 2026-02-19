/* main.js */

// הגדרת משתנים לשמירה
let selectedVehicle = null;
let options = {
    handicap: false,
    electric: false,
    wideSpot: false
};

$(document).ready(function() {
    
    // 1. לוגיקה לבחירת רכב (כמו בתמונה)
    $('.vehicle-card').click(function() {
        // הסרת הבחירה מכולם
        $('.vehicle-card').removeClass('selected');
        // הוספת בחירה למה שנלחץ
        $(this).addClass('selected');
        
        // שמירת סוג הרכב
        selectedVehicle = $(this).data('type');
        console.log("רכב נבחר:", selectedVehicle);
    });

    // 2. לוגיקה למתגים (Toggle)
    $('.toggle-switch').change(function() {
        const key = $(this).attr('id');
        options[key] = $(this).is(':checked');
    });

    // 3. כפתור חיפוש
    $('#searchBtn').click(function() {
        if (!selectedVehicle) {
            alert('אנא בחר סוג רכב כדי להתקדם');
            return;
        }
        
        // שמירה ל-LocalStorage ומעבר למסך טעינה
        localStorage.setItem('userVehicle', selectedVehicle);
        localStorage.setItem('userOptions', JSON.stringify(options));
        
        window.location.href = 'scanning.html';
    });

    // 4. לוגיקה למסך טעינה (scanning.html)
    if (window.location.pathname.includes('scanning.html')) {
        setTimeout(function() {
            window.location.href = 'result.html';
        }, 3000); // ממתין 3 שניות ומעביר
    }

    // 5. לוגיקה למסך תוצאה (result.html)
    if (window.location.pathname.includes('result.html')) {
        const vehicle = localStorage.getItem('userVehicle') || "רכב";
        const savedOptions = JSON.parse(localStorage.getItem('userOptions') || "{}");
        
        $('#vehicleDisplay').text(vehicle);
        
        if (savedOptions.handicap) {
            $('#matchReason').text('נמצאה חניית נכים רחבה במיוחד במיקום מנצח!');
        } else {
            $('#matchReason').text('נמצאה חנייה התואמת בדיוק למידות הרכב שלך.');
        }
    }
});
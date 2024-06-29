import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="p-4">
      <main className="max-w-4xl mx-auto" style={{ direction: "rtl" }}>
        <h1 className="text-2xl font-bold mb-4">מדיניות פרטיות של Quickline</h1>

        <div className="bg-yellow-100 p-4 rounded mb-4">
          <p className="text-sm">
            השימוש באפליקציית Quickline והעברת מידע לאפליקציות אחרות ב-Google
            נעשים בהתאם למדיניות נתוני המשתמש של שירותי Google API, כולל דרישות
            ההגבלות בשימוש. למדיניות זו, ראה את
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              מדיניות נתוני משתמש של שירותי Google API
            </a>
            .
          </p>
        </div>

        <p className="mb-4">
          מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, מאחסנים ומשתפים את
          המידע שנאסף ממך במהלך השימוש שלך באפליקציית Quickline (להלן "היישום").
          היישום נוצר ומסופק על ידי חראל לוי (להלן "ספק השירות") וזמין לשימוש
          כשירות חינמי דרך דפדפנים.
        </p>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">איסוף ושימוש במידע</h2>
          <p className="mb-4">
            אנו אוספים מידע בעת שימושך ביישום. המידע שאנו אוספים עשוי לכלול:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>כתובת ה-IP שלך.</li>
            <li>
              הדפים בהם ביקרת ביישום, תאריך ושעת ביקור, וזמן השהות בדפים אלו.
            </li>
            <li>מערכת ההפעלה והדפדפן שאתה משתמש בהם.</li>
            <li>
              מידע הקשור לאימות OAuth 2.0 לצורך גישה ל-API של Google, כולל זיהוי
              משתמשים וטוקנים.
            </li>
          </ul>
          <p className="mb-4">היישום אינו אוסף מידע מדויק על מיקומך הפיזי.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">נתוני משתמש של Google</h2>
          <p className="mb-4">
            בהתאמה למדיניות שירותי Google API, אנו מטפלים בנתוני המשתמש של
            Google כדלקמן:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>גישה:</strong> אנו ניגשים לנתוני המשתמש של Google באמצעות
              OAuth 2.0 לצורך אימות משתמש וגישה לאירועי יומן Google ומידע פרופיל
              הדרושים לתפקוד היישום.
            </li>
            <li>
              <strong>שימוש:</strong> הנתונים שנאספים משמשים רק לספק את
              הפונקציונליות של היישום. לדוגמה, אנו משתמשים באירועי היומן שלך
              להצגת שיעוריך.
            </li>
            <li>
              <strong>אחסון:</strong> אנו מאחסנים טוקנים וזיהויים בצורה מאובטחת
              כדי להבטיח גישה רציפה ל-API של Google. אנו משתמשים בהצפנה ובאמצעי
              אבטחה סטנדרטיים.
            </li>
            <li>
              <strong>שיתוף:</strong> אנו לא משתפים את נתוני המשתמש של Google עם
              צדדים שלישיים, אלא במקרים הבאים:
              <ul className="list-disc list-inside ml-6">
                <li>לצורך עמידה בדרישות חוקיות.</li>
                <li>להגנה על זכויותינו או זכויות אחרים ומניעת הונאות.</li>
                <li>
                  לצורך תמיכה טכנית מספקי שירות מהימנים שאינם משתמשים במידע שלך
                  לשום מטרה אחרת.
                </li>
              </ul>
            </li>
            <li>
              <strong>שמירה:</strong> אנו נשמור את הנתונים שלך כל עוד יש לך
              חשבון פעיל. אם תבקש למחוק את הנתונים שלך, פנה אלינו בכתובת
              harellevi85@gmail.com, ונשיב תוך 30 ימים.
            </li>
          </ul>
          <p className="mb-4">
            השימוש שלנו בנתוני משתמש של Google מוגבל למה שמתואר במדיניות פרטיות
            זו. אנו מחויבים להגן על הנתונים שלך ולוודא שהם משמשים רק לשיפור
            חוויית השימוש שלך ביישום.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">גישה לצדדים שלישיים</h2>
          <p className="mb-4">
            מידע סטטיסטי ואנונימי עשוי להיות משותף עם צדדים שלישיים כדי לשפר את
            היישום. ספק השירות עשוי לשתף את המידע שלך במקרים הבאים:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>עם Google לצורך אימות גישה ויישום של OAuth 2.0.</li>
            <li>במידה שנדרש על פי חוק.</li>
            <li>
              כדי להגן על זכויותינו או זכויות אחרים, לשמור על בטיחותך ולמנוע
              הונאות.
            </li>
            <li>
              עם ספקי שירות מהימנים שמצייתים למדיניות פרטיות זו ולא ישתמשו במידע
              שלך לשום מטרה אחרת.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">זכויות ביטול (Opt-Out)</h2>
          <p className="mb-4">
            באפשרותך להפסיק את איסוף כל המידע על ידי היישום על ידי הפסקת השימוש
            בו. ניתן למחוק את חשבונך או להפסיק את השימוש ביישום.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">מדיניות שמירת הנתונים</h2>
          <p className="mb-4">
            אנו נשמור על נתונים שסיפקת כל עוד יש לך חשבון פעיל. לאחר בקשת מחיקה,
            הנתונים שלך יוסרו מהשרתים שלנו תוך 30 ימים.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">ילדים</h2>
          <p className="mb-4">
            היישום אינו מיועד לשימוש ילדים מתחת לגיל 13 ואינו אוסף מידע אישי
            מזהה מילדים בגיל זה.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">אבטחה</h2>
          <p className="mb-4">
            אנו מחויבים להגן על המידע שלך באמצעות אמצעים פיזיים, אלקטרוניים
            ומנהליים תקינים להגנה על המידע שלך, כולל הצפנה ובקרת גישה.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">שינויים במדיניות</h2>
          <p className="mb-4">
            מדיניות זו עשויה להשתנות מעת לעת. אנו נודיע לך על שינויים על ידי
            עדכון עמוד זה. המשך שימושך ביישום לאחר פרסום השינויים מהווה הסכמתך
            למדיניות פרטיות מעודכנת זו.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">יצירת קשר</h2>
          <p className="mb-4">
            אם יש לך שאלות או בקשות בנוגע למדיניות פרטיות זו, אנא צור איתנו קשר
            בכתובת הדוא"ל harellevi85@gmail.com.
          </p>
        </div>
      </main>
    </div>
  );
}

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="p-4">
      <main className="max-w-4xl mx-auto" style={{ direction: "rtl" }}>
        <h1 className="text-2xl font-bold mb-4">מדיניות פרטיות של Quickline</h1>

        {/* Limited Use Policy Disclosure */}
        <div className="bg-green-100 p-4 rounded mb-4">
          <p className="text-sm">
            השימוש באפליקציית Quickline והעברת מידע לאפליקציות אחרות של Google
            ייעשו בהתאם למדיניות נתוני משתמש של שירותי Google API, כולל דרישות
            השימוש המוגבל. למידע נוסף, ראה את
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

        {/* Google API User Data Policy */}
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

        {/* Detailed Security Measures */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">אבטחה מפורטת</h2>
          <p className="mb-4">
            אנו משתמשים באמצעי אבטחה מתקדמים, כולל הצפנת SSL לשמירה על נתוני
            המשתמשים בזמן העברה, והצפנה בתקן AES לאחסון נתונים רגישים. בנוסף,
            אנו מקפידים על בקרות גישה מחמירות כדי להבטיח שרק משתמשים מורשים
            יכולים לגשת לנתונים.
          </p>
        </div>

        {/* Transparency in Data Sharing */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">
            שיתוף נתונים עם צדדים שלישיים
          </h2>
          <p className="mb-4">
            אנו משתפים נתונים רק במקרים חיוניים לשירות או כאשר הדבר נדרש על פי
            חוק. כל ספקי השירות שלנו מתחייבים לעמוד במדיניות פרטיות זו ולא
            ישתמשו במידע שלך למטרות אחרות.
          </p>
        </div>

        {/* User Rights and Choices */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">זכויות ובחירות של המשתמש</h2>
          <p className="mb-4">
            המשתמשים יכולים לגשת למידע שלהם, לעדכן אותו או לבקש את מחיקתו בכל
            עת. ניתן לשלוט בהגדרות הפרטיות דרך חשבון המשתמש באפליקציה או לפנות
            אלינו בכתובת הדוא"ל harellevi85@gmail.com לביצוע שינויים.
          </p>
        </div>

        {/* In-Product Privacy Notifications */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">הודעות פרטיות בתוך היישום</h2>
          <p className="mb-4">
            אנו מציגים הודעות פרטיות בתוך היישום כאשר אנו אוספים נתונים רגישים,
            כגון בעת בקשת גישה לאירועי יומן Google שלך או פרטי הפרופיל שלך.
            הודעות אלו כוללות הסבר על המידע הנאסף ומדוע אנו זקוקים לו.
          </p>
        </div>

        {/* Standard Sections */}
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
            מידע המשתמש לא ישותף עם צדדים שלישיים מלבד במקרים הבאים:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>כאשר הדבר נדרש לצורך עמידה בדרישות חוקיות.</li>
            <li>
              כאשר הדבר נדרש לצורך הגנה על זכויות, רכוש או בטיחות המשתמשים או
              הציבור.
            </li>
            <li>
              כאשר המידע מועבר לספקי שירות מהימנים לצורך תמיכה טכנית או שירותי
              ענן. ספקים אלו מחויבים להבטיח את בטיחות המידע ולא לעשות בו כל
              שימוש אחר.
            </li>
          </ul>
          <p className="mb-4">
            אנו מחויבים להבטיח כי כל צד שלישי המקבל גישה למידע שלך יעשה בו שימוש
            אך ורק בהתאם למדיניות פרטיות זו.
          </p>
        </div>
      </main>
    </div>
  );
}

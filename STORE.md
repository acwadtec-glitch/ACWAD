# نشر "عالم الأكواد" على Google Play و App Store

المشروع الجاهز في فولدر `store/` (Capacitor). اسم الحزمة: `com.acwadtech.codeworld` (غيّره في `store/capacitor.config.json` وفي `store/android/app/build.gradle` قبل أول رفع لو عايز اسم تاني، لأنه مينفعش يتغيّر بعد النشر).

## Google Play (أندرويد)
1. حساب Google Play Console (رسم تسجيل 25$ مرة واحدة).
2. اعمل مفتاح توقيع (مرة واحدة، واحفظه في مكان آمن ومتفقدوش):
   `keytool -genkey -v -keystore release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias codeworld`
3. حوّله Base64: `base64 -w0 release.jks`، وفي ريبو GitHub ثم Settings ثم Secrets and variables ثم Actions أضف:
   `ANDROID_KEYSTORE_B64` و`ANDROID_KEYSTORE_PASSWORD` و`ANDROID_KEY_ALIAS` و`ANDROID_KEY_PASSWORD`.
4. من تبويب Actions شغّل "Android (Google Play)" ثم نزّل الـartifact `android-builds`:
   - `app-debug.apk` للتجربة على موبايلك.
   - `app-release.aab` هو اللي بيترفع على Play Console.
5. في Play Console: أنشئ تطبيق، ارفع الـAAB على Internal testing الأول، واملأ: وصف، لقطات شاشة (موبايل)، أيقونة 512، سياسة خصوصية (رابط)، تصنيف المحتوى، Data safety.
   ملحوظة: الحسابات الشخصية الجديدة بيطلب منها Google اختبار مغلق بـ12 مختبر لمدة 14 يوم قبل النشر العام.

## App Store (آيفون)
محتاج: حساب Apple Developer (99$ في السنة) وجهاز Mac فيه Xcode (أو خدمة بناء سحابية زي Codemagic).
1. على الـMac: `cd store && npm ci && npm run sync && npx cap open ios`
2. في Xcode: اختار الـTeam بتاعك في Signing & Capabilities، وتأكد من الـBundle Identifier.
3. Product ثم Archive ثم Distribute App ثم App Store Connect.
4. في App Store Connect: أنشئ التطبيق واملأ الوصف واللقطات وسياسة الخصوصية، وابعته للمراجعة.
ملاحظة: الـworkflow `iOS (App Store check)` بيتأكد بس إن المشروع بيتبني على سيرفر macOS، مش بيرفع للمتجر.

## تحديث اللعبة
عدّل `index.html` في جذر الريبو (أو انسخ النسخة الجديدة) ثم `npm run sync` داخل `store/` وابني من جديد. ارفع `versionCode` في `store/android/app/build.gradle` مع كل تحديث على Play.

## قيود لازم تعرفها
- الأونلاين بيعتمد على اتصال WebRTC مباشر عبر خوادم تتبّع عامة، مش مضمون على كل الشبكات. للمتاجر يفضّل سيرفر حقيقي (Firebase/Supabase) لو عايز لوحة متصدرين ثابتة.
- Apple ممكن ترفض تطبيقات "مجرد موقع". هنا اللعبة مضمّنة جوه التطبيق وبتشتغل أوفلاين، وده في صالحك، لكن القرار النهائي عند المراجعة.

type LocaleType = {
   [key: string]: { [key: string]: string }; // Index signature to accept any string keys and values
}
 const locale:LocaleType = {
   ar:{
      profile:'الملف الشخصي',
      home:'الرئيسية',
      about:'عنا',
      specialization:'التخصصات',
      contact:'تواصل معنا',
      language:'اللغة',
   },
   en:{
      profile:'profile',
      home:'home',
      about:'about',
      specialization:'specialization',
      contact:'contact',
      language:'language',
   }
}
export default locale
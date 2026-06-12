const Kalam = require('../models/Kalam');
const {getUser} = require('../service/auth');

const dbImageUploader=async(kalamFields, uuid, kalamBg, kalamAudio)=>{

          const { title,
      content,
      badgeBg,
      badgeBorder,
      autoMainColor,
      resolvedTitleColor,
      titleFs,
      resolvedTitleFamily,
      resolvedContentColor,
      contentFs,
      resolvedContentFamily,
      subColor,
      backdrop,
      resolvedTextColor,
      activeMoods,
      type,
      bgTab,
      customColor,
      selectedColor,
      bgOpacity,
      scrim} = kalamFields

   return  Kalam.create({
       name: title,
      content: content,
      createdBy: uuid,
      type: type[0],
      kalamAudio: kalamAudio,
      customStyles:{
      badgeBg,
      badgeBorder,
      autoMainColor,
      resolvedTitleColor,
      titleFs,
      resolvedTitleFamily,
      resolvedContentColor,
      contentFs,
      resolvedContentFamily,
      subColor,
      backdrop,
      resolvedTextColor,
      activeMoods,
      bgTab,
      customColor,
      selectedColor,
      bgOpacity,
      scrim,
      imageSrc: kalamBg,
      isImage: true
      }
     })

     .then((kalamBgUpdate)=>{
        console.log("Kalam background cover updated successfully");
        return kalamBgUpdate
     }).catch((error)=>{
        console.log("Error while uploading klalam bg to mongoDB");
     })
    

}


module.exports = dbImageUploader
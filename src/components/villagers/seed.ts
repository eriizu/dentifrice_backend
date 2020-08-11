import * as source from "./villagers.json";
import * as villagers from ".";

export default async function seed() {
    source.forEach(async (villager) => {
        // console.log(":: adding ", villager.nameFR);
        let doc = await villagers.model.findOneAndUpdate(
            {
                "name.fr": villager.nameFR,
            },
            {
                name: { fr: villager.nameFR, en: villager.nameEN },
                quote: villager.quote,
                image: villager.imageUrl,
                species: villager.species,
            },
            { upsert: true, new: true }
        );
        // console.log(" --> added ", doc);
    });
}

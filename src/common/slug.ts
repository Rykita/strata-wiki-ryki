/**
 * ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡀⠀⣿⣿⠆
 * ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡿⠇⠀⣿⠁⠀
 * ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣧⣴⣶⣿⡀⠀
 * ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⡄
 * ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⠇
 * ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠿⠋⠀
 * ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⠀⠀⠀
 * ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀
 * ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀
 * ⠀⠀⣀⣀⣤⣴⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀
 * ⠐⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠁⠀⠀⠀⠀⠀
 */
export class Slug {
    game: string;
    category?: string;
    topic?: string;
    article?: string;

    constructor(game?: string, category?: string, topic?: string, article?: string) {
        this.set(game, category, topic, article);
    }

    /**
     * Sets the slug to the given article path. This will overwrite any existing content.
     * @param game     The Game ID
     * @param category The Category ID
     * @param topic    The Topic ID
     * @param article  The Article ID
     */
    set(game?: string, category?: string, topic?: string, article?: string) {
        // Blank out our slug. Assume that we're on an index page. If we're not, we'll fill it in later
        this.game = null;
        this.category = null;
        this.topic = null;
        this.article = 'index';

        // game/index
        if (game && game.length > 0) this.game = game;

        // game/category/index
        if (category && category.length > 0) this.category = category;

        // game/category/topic/index
        if (topic && topic.length > 0) this.topic = topic;

        // game/category/topic/article
        if (article && article.length > 0) this.article = article;
    }

    /**
     * Converts the slug into a string
     * @param excludeIndexArticle If true, any articles named "index" will not be appended
     * @returns A representation of the slug as a path
     */
    toString(excludeIndexArticle: boolean = false): string {
        let str = this.game;
        for (const property of [this.category, this.topic]) if (property) str += '/' + property;

        // Only append the index if we don't want it excluded
        if (this.article && (!excludeIndexArticle || this.article !== 'index')) str += '/' + this.article;

        return str;
    }

    /**
     * Separates the slug into an easily digestible object
     * @param slug The slug you are trying to parse
     */
    fromString(slug: string): Slug {
        // Split the string and use it as our value
        const split = slug.split('/');
        this.set(split[0], split[1], split[2], split[3]);

        // Return this for ease of use
        return this;
    }
}

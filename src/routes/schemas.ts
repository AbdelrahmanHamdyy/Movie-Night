/**
 * @swagger
 * components:
 *  schemas:
 *      Company:
 *        type: object
 *        properties:
 *          id:
 *              type: number
 *              description: Movie ID
 *          name:
 *              type: string
 *              description: Company Name
 *          about:
 *              type: string
 *              description: Description about the company background
 *          photo_url:
 *              type: string
 *              description: Display picture URL
 *          location:
 *              type: string
 *              description: Country in which the company resides
 *          owner_id:
 *              type: number
 *              description: User ID of the company owner
 *          followed:
 *              type: boolean
 *              description: Determines whether the logged in user follows this company or not (In case all companies are returned not only the followed ones)
 *      FilmMaker:
 *        type: object
 *        properties:
 *           id:
 *             type: number
 *             description: Film Maker ID
 *           first_name:
 *             type: string
 *             description: First Name
 *           last_name:
 *             type: string
 *             description: Last Name
 *           about:
 *             type: string
 *             description: Quick summary about this film maker.
 *           country:
 *             type: string
 *             description: Nationality
 *           gender:
 *             type: string
 *             default: male
 *             enum:
 *                - male
 *                - female
 *           avatar:
 *             type: string
 *             description: Display picture URL
 *           birthday:
 *             type: string
 *             format: date
 *             description: Date that this person was born
 *           is_writer:
 *             type: boolean
 *             description: True if this film maker is a writer, else False
 *           is_producer:
 *             type: boolean
 *             description: True if this film maker is a producer, else False
 *           is_director:
 *             type: boolean
 *             description: True if this film maker is a director, else False
 *           is_actor:
 *             type: boolean
 *             description: True if this film maker is an actor, else False
 *      Movie:
 *        type: object
 *        properties:
 *          id:
 *              type: number
 *              description: Movie ID
 *          title:
 *              type: string
 *              description: Movie Title
 *          about:
 *              type: string
 *              description: Description about the story of the movie and its main idea
 *          cover:
 *              type: string
 *              description: Display picture path of the movie
 *          trailer:
 *              type: string
 *              description: Path for the movie trailer
 *          score:
 *              type: number
 *              description: A number representing the popularity of this movie (Higher means more popular)
 *          rating:
 *              type: number
 *              description: Rating of the movie averaged from users who rated it
 *              minimum: 0
 *              maximum: 10
 *          release_date:
 *              type: string
 *              format: date-time
 *              description: Movie official release date
 *          language:
 *              type: string
 *              description: Language in which the movie was written with
 *          country:
 *              type: string
 *              description: Movie originated in this country
 *          award:
 *              type: string
 *              description: Award given to a movie (Bronze/Silver/Gold)
 *          director_id:
 *              type: number
 *              description: Movie director ID
 *          producer_id:
 *              type: number
 *              description: Movie producer ID
 *          company_id:
 *              type: number
 *              description: Production Company ID
 *          budget:
 *              type: number
 *              format: double
 *              description: Estimated budget for this movie
 *          added_to_watchlist:
 *              type: boolean
 *              description: Indicates whether this movie was added to the watchlist in case there's a logged in user
 *          rated:
 *              type: boolean
 *              description: Indicates whether the logged in user has rated this movie or not
 *          user_rating:
 *              type: number
 *              description: The user rating in case the rated parameter was true
 *      Review:
 *        type: object
 *        properties:
 *           movieId:
 *             type: number
 *             description: Movie ID
 *           reviewBody:
 *             type: string
 *             description: Contents of the review
 *           spoiler:
 *             type: boolean
 *             description: This indicates whether this review contains a spoiler to this movie or not
 *           recommended:
 *             type: boolean
 *             description: Indicates whether this user recommends the movie to others or not
 *           favActorID:
 *             type: number
 *             description: This is the ID of the user's favorite actor
 *      Watchlist:
 *        type: object
 *        properties:
 *          id:
 *              type: number
 *              description: Movie ID
 *          title:
 *              type: string
 *              description: Movie Title
 *          about:
 *              type: string
 *              description: Description about the story of the movie and its main idea
 *          cover:
 *              type: string
 *              description: Display picture path of the movie
 *          rating:
 *              type: number
 *              description: Rating of the movie averaged from users who rated it
 *              minimum: 0
 *              maximum: 10
 *          release_date:
 *              type: string
 *              format: date-time
 *              description: Movie official release date
 *          language:
 *              type: string
 *              description: Language in which the movie was written with
 *          country:
 *              type: string
 *              description: Movie originated in this country
 *          directorName:
 *              type: string
 *              description: Movie director name
 *          producerName:
 *              type: string
 *              description: Movie producer name
 *          companyName:
 *              type: string
 *              description: Production Company name
 *          rated:
 *              type: boolean
 *              description: Indicates whether the logged in user has rated this movie or not
 *          user_rating:
 *              type: number
 *              description: The user rating in case the rated parameter was true
 */

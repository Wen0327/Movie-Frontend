export const validateMovie = (movieInfo) => {
    const {
      title,
      storyLine,
      status,
      type,
      language,
      releaseDate,
      tags,
      genres,
      cast,
    } = movieInfo;
  
    const validators = [
      { field: title, errorMessage: "Title is missing!" },
      { field: storyLine, errorMessage: "Storyline is missing!" },
      { field: status, errorMessage: "Status is missing!" },
      { field: type, errorMessage: "Type is missing!" },
      { field: language, errorMessage: "Language is missing!" },
      { field: releaseDate, errorMessage: "Release Date is missing!" },
    ];
  
    for (const { field, errorMessage } of validators) {
      if (!field.trim()) {
        return { error: errorMessage };
      }
    }
  
    if (!genres.length) return { error: "Genres is missing!" };
  
    for (let gen of genres) {
      if (!gen.trim()) return { error: "Invalid genres" };
    }
  
    //valid is array
    if (!tags.length) return { error: "Tags is missing!" };
  
    //valid is string
    for (let tag of tags) {
      if (!tag.trim()) return { error: "Invalid tags" };
    }
  
    //valid is array
    if (!cast.length) return { error: "Cast is missing!" };
  
    //valid is object
    for (let c of cast) {
      if (typeof c !== "object") return { error: "Invalid cast" };
    }
  
    return { error: null };
  };
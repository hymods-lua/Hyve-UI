export type HomePageDictionary = {
    home: string,
    welcome:string,
    hero: {}
}

export type TermsPageDictionary = {
    title: string
    last_updated:string 
    intro:       string 
    sections: {
        title:      string
        content:    string
    }[],
    contact_title: string
    contact_text:  string
}
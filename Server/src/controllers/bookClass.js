class BookClass {
    constructor() {
        BookClass._instance = this;
    };
    
    static Bookinstance() {
        if(!BookClass._instance){
            return new BookClass();
        }
  
        return BookClass._instance;
      }
    async setBookAttributes(bookName)
    {
        this.bookName=bookName
    }

    async addBook(db) {
        let bName;
        bName = this.bookName.toUpperCase();
        const isExists = await db.collection("bookDetails").find({ bookName: bName }).toArray();
        if (isExists.length > 0) {
            return { status: true, message: "Exists" }
        }
        else {
            const createdStudent = await db.collection("bookDetails").insertOne({ bookName: bName });
            return { status: true, message: "Added" };
        }
    }
    async searchBook(db) {
        let bName;
        bName = this.bookName.toUpperCase();
        let bookFound = await db.collection("bookDetails").find({ bookName: bName }).toArray();
        return bookFound && bookFound.length > 0 ? { status: true, message: "Found" } : { status: true, message: "Not Found" }
    }
}


module.exports = BookClass;
package ParentWeb;

public class User {
    
    private int id;
    private String name;
    private String lang;
     private int type; 

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
     private String password;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    } 
}

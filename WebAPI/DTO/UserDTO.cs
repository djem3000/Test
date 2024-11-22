public class UserDTO
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string[] Roles { get; set; }
    public int Logins { get; set; }
    public DateTime? LastLogin { get; set; }    
}
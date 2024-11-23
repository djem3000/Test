using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebAPI.Database;

namespace WebAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);            

            // Add services to the container.
            builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Filename=App.db"));
            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<IdentityUserExt>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            builder.Services.AddIdentityCore<IdentityUserExt>()
              .AddRoles<IdentityRole>()
              .AddEntityFrameworkStores<AppDbContext>();

            builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUserExt>, CustomClaimsPrincipalFactory>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/openapi/v1.json", "v1");
                });
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowAllHeaders");

            app.UseAuthentication();
            app.UseAuthorization();                       

            app.MapIdentityApi<IdentityUserExt>();
            app.MapControllers();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var userManager = services.GetRequiredService<UserManager<IdentityUserExt>>();
                    var rolesManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                    await DataInitializer.InitializeAsync(userManager, rolesManager);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }

            app.Run();
        }
    }
}

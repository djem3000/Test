using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Writers;
using System.Globalization;
using WebAPI.DTO;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private WeatherForecast[] Data;

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;

            Init();
        }

        private void Init()
        {
            Data =  Enumerable.Range(1, 100).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(new DateTime(Random.Shared.Next(2020, 2024), Random.Shared.Next(1, 12), Random.Shared.Next(1, 28))),
                TemperatureC = Random.Shared.Next(-20, 55)                
            })
           .ToArray();
        }        

        [HttpGet]        
        [Route("~/TemperatureHistory/{year:int?}")]
        public ActionResult GetTemperatureHistory(int? year)
        {
            if (year == null)
                year = Data.Min(x => x.Date.Year);

            var byMounth = Data.Where(x => x.Date.Year == year).GroupBy(x => x.Date.Month).OrderBy(x=>x.Key);
            var result = byMounth.Select(x => new MounthTemperatureDTO { Mounth = DateTimeFormatInfo.InvariantInfo.MonthNames[x.Key-1], Temperature = (int)x.Average(y => y.TemperatureC) });

            return Ok(new { Years = Data.Select(x=>x.Date.Year).OrderBy(x=>x).Distinct(), Year = year, Data = result});
        }
    }
}

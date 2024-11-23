using System.Reflection;
using System.Text.Json;
using System.Text;

public static class Resources
{
    public static class Embedded
    {
        public static byte[] File(string fileName)
        {
            var info = Assembly.GetExecutingAssembly().GetName();
            var name = info.Name;
            using var stream = Assembly
                .GetExecutingAssembly()
                .GetManifestResourceStream($"{name}.{fileName}")!;
            var buffer = new byte[stream.Length];
            stream.Read(buffer, 0, (int)stream.Length);

            return buffer;
        }
    }
}
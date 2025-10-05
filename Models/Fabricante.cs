using System.ComponentModel.DataAnnotations;

namespace VendaVeiculosApi.Models;

public class Fabricante
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Nome { get; set; } = string.Empty;

    [Required]
    public string Origem { get; set; } = string.Empty;

    public ICollection<Veiculo>? Veiculos { get; set; }
}

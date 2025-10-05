using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VendaVeiculosApi.Models;

public class Veiculo
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Modelo { get; set; } = string.Empty;

    public string Placa { get; set; } = string.Empty;

    public string Cor { get; set; } = string.Empty;

    public int Ano { get; set; }

    public int Quilometragem { get; set; }

    public decimal Preco { get; set; }

    // foreign key
    public int FabricanteId { get; set; }
    public Fabricante? Fabricante { get; set; }
}

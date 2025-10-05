using Microsoft.EntityFrameworkCore;
using VendaVeiculosApi.Models;

namespace VendaVeiculosApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Fabricante> Fabricantes { get; set; }
    public DbSet<Veiculo> Veiculos { get; set; }
    public DbSet<Aluguel> Alugueis { get; set; }
    public DbSet<Pagamento> Pagamentos { get; set; }
}
